import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import prevencherChatStyles from "./prevencherChat.module.css";
import { venchyData } from "../../utils/constants";
import DOMPurify from "dompurify";
import Message from "../message/message";
import VoiceMessageButton from "../voiceMessageButton/voiceMessageButton";
import Loader from "../loader/loader";
import { useAppSelector } from "../../services/hooks";
import { userSelector } from "../../services/selectors/user.selectors";
import {
  useInsertAllAnswersQuestionsMutation,
  useLazyGetNextQuestionByQuestionnaireIdQuery,
  useLazyGetQuestionByQuestionnaireIdQuery,
  useLazyGetQuestionnAirByGuidAndTypeQuery,
} from "../../services/api/user.api";
import { prevencherId } from "../../utils/prevencherForGuestsQuestions";
import { prevencherCategoris } from "../../utils/categories";
import { IQuestionOption } from "../../services/types/user.types";
import {
  convertBlobToBase64,
  formatDateTimeInIsrael,
  israeliPhoneRegExp,
  replaceVariables,
} from "../../utils/utils";

const PrevencherChat: React.FC<{ category: string }> = ({ category }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const lastElRef = useRef<HTMLDivElement | null>(null);

  const [nextQuestionId, setNextQuestionId] = useState<number>(-1);
  const user = useAppSelector(userSelector);
  const [allAnswers, setAllAnswers] = useState<any[]>([]);
  const [questionnaireId, setQuestionnaireId] = useState<number>(-1);
  const [currentQuestionnaireCompanyId, setCurrentQuestionnaireCompanyId] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(-1);
  const [questionsOptions, setQuestionsOptions] = useState<IQuestionOption[]>([]);
  const [endQuestion, setEndQuestion] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [options, setOptions] = useState<IQuestionOption[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [showTextArea, setShowTextArea] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showNumberInput, setShowNumberInput] = useState(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showVoiceMessageButton, setShowVoiceMessageButton] = useState(false);

  const [getQuestionById, getQuestionByIdResult] = useLazyGetQuestionByQuestionnaireIdQuery();
  const [getNextQuestionById] = useLazyGetNextQuestionByQuestionnaireIdQuery();
  const [insertAllAnswers] = useInsertAllAnswersQuestionsMutation();
  const [getQuestionnaire] = useLazyGetQuestionnAirByGuidAndTypeQuery();

const [questionnaireResponse, setQuestionnaireResponse] = useState<any>(null);



const fetchQuestionnaireByCategory = async () => {
  const response = await getQuestionnaire({ guid: user.guid, typeId: 2 });
  console.log("✅ got questionnaire response", response.data);

  if (response.data?.Questionnaire?.Id) {
    setQuestionnaireId(response.data.Questionnaire.Id);
    setQuestionnaireResponse(response.data); 
    setIsDataLoaded(true); 
  }
};

// --- useEffect for questions
useEffect(() => {
  console.log("🚀 useEffect getQuestionById", { questionnaireId, isDataLoaded });

  if (questionnaireId >= 0 && isDataLoaded) {
    const questionId = nextQuestionId && nextQuestionId > 0 ? nextQuestionId : 0;
    const seqId = questionId > 0 ? 0 : 1;

    console.log("➡️ Fetching question:", { questionnaireId, questionId, seqId });

    getQuestionById({
      currentQuestionnAirId: questionnaireId,
      nextQuestionId: questionId,
      seqId,
      skip: false,
    });
  }
}, [questionnaireId, isDataLoaded]);




  // 


useEffect(() => {
  if (category && user?.guid) {
    fetchQuestionnaireByCategory();
  }
}, [category, user?.guid]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (nextQuestionId === -1) {
      setNextQuestionId(1);
    }
  }, []);

 useEffect(() => {
  if (nextQuestionId === -1) {
    setNextQuestionId(1);
  }
}, []);

  useEffect(() => {
    const message = currentQuestion?.Desc
      ? replaceVariables(currentQuestion?.Desc, user)
      : replaceVariables(endQuestion, user);

    if (
      getQuestionByIdResult.status === "fulfilled" &&
      currentQuestion?.Desc &&
      messages.at(-1)?.message !== message
    ) {
      setMessages((prev) => [
        ...prev,
        {
          messageId: currentQuestionId,
          id: prevencherId,
          date: new Date(),
          message: message,
          unread: false,
          nextQuestionId: 0,
        },
      ]);
    }
  }, [getQuestionByIdResult.status]);

  useEffect(() => {
    if (currentQuestion?.DataTypesId === 1) {
      setOptions(questionsOptions);
    } else {
      setOptions([]);
    }
  }, [questionsOptions, currentQuestion]);

  useEffect(() => {
    if (currentQuestion?.DataTypesId === 2) {
      currentQuestion?.Id === 72 || currentQuestion?.Id === 19
        ? setShowTextArea(true)
        : setShowInput(true);
    } else {
      setShowInput(false);
      setShowTextArea(false);
    }

    if (currentQuestion?.DataTypesId === 3) {
      setShowNumberInput(true);
    } else {
      setShowNumberInput(false);
    }

    if (currentQuestion?.DataTypesId === 5) {
      setIsLoading(true);
      setOptions([]);
      delay(1500).then(() => {
        if (currentQuestion.NextQuestionId) {
          getNextQuestionById({
            currentQuestionId: currentQuestionId,
            nextQuestionId: currentQuestion.NextQuestionId,
            skip: false,
          });
        } else {
          setIsLoading(false);
          setIsEnd(true);
        }
      });
    } else {
      setIsLoading(false);
    }

    if (currentQuestion?.DataTypesId === 6) {
      setShowVoiceMessageButton(true);
    } else {
      setShowVoiceMessageButton(false);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (isEnd) {
      insertAllAnswers({
        answers: allAnswers,
        companyId: 1,
        QuestionnaireCompanyId: currentQuestionnaireCompanyId ?? 0,
        guid: user?.guid,
      });
    }
  }, [isEnd]);

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const scrollToBottom = () => {
    setTimeout(() => lastElRef.current?.scrollIntoView({ behavior: "smooth" }), 0);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const sanitized = DOMPurify.sanitize(e.target.value);
    setInputValue(sanitized);
  };

  return (
    <div className={prevencherChatStyles.section}>
      {messages.length > 0 &&
        messages.map((message, index) => (
          <Message
            key={index}
            isOwnMessage={message.id != prevencherId}
            therapist={venchyData}
            message={message}
            getQuestionById={() =>
              getNextQuestionById({
                nextQuestionId: message.questionId ?? -1,
                skip: false,
                currentQuestionId: questionnaireId ?? -1,
              })
            }
            isLoading={isLoading || isEnd}
          />
        ))}

      {showInput && (
        <div className={prevencherChatStyles.inputContainer}>
          <textarea
            ref={textAreaRef}
            value={inputValue}
            onChange={handleInputChange}
            className={prevencherChatStyles.input}
          />
        </div>
      )}

      {isLoading && (
        <div>
          <Loader />
        </div>
      )}

      {showVoiceMessageButton && <VoiceMessageButton onSend={() => {}} />}
      <div ref={lastElRef} />
    </div>
  );
};

export default PrevencherChat;
