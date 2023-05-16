import { FaSpinner } from "react-icons/fa";
import React, { useState, useRef, useEffect } from "react";
import TodoDropList from "./TodoDropList";
import MoreIcon from "./common/MoreIcon";
import { TodoDropDownPropsType } from "../types/todo";
import { MAX_SUGGESTIONS } from "../constants";
import { searchRecommendation } from "../api/search";

const TodoDropDown: React.FC<TodoDropDownPropsType> = ({
  recommendData,
  handleDropDownClick,
  inpText,
}) => {
  const [recommendResult, setRecommendResult] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const contRef = useRef<HTMLDivElement>(null);
  const target = useRef(null);

  useEffect(() => {
    inpText && recommendData
      ? setRecommendResult(recommendData.result)
      : setRecommendResult([]);
    setPage(1);
    setIsLastPage(false);
    contRef.current && contRef.current.scrollTo(0, 0);
  }, [recommendData, inpText]);

  useEffect(() => {
    const handleIntersection = async (entries: IntersectionObserverEntry[]) => {
      if (!recommendData) return;

      const isTotalLessThanMax = recommendData.total < MAX_SUGGESTIONS;
      if (isTotalLessThanMax) return;

      const isIntersecting = entries[0].isIntersecting;
      if (!isIntersecting) return;

      if (!isLastPage) {
        console.info("더 많은 데이터 요청");

        try {
          setTimeout(() => setIsLoading(true), 100);
          const { data } = await searchRecommendation(
            recommendData.q,
            page + 1
          );
          setIsLoading(false);
          if (data.result.length) {
            setPage((prevPage) => prevPage + 1);
            setRecommendResult((prevResult) => [...prevResult, ...data.result]);
          } else {
            setIsLastPage(true);
          }
        } catch (error) {
          setIsLoading(false);
          console.error(error);
          alert("something went wrong");
        }
      }
    };

    const options = { threshold: 0.5 };
    const observer = new IntersectionObserver(handleIntersection, options);

    target.current && observer.observe(target.current);

    return () => {
      observer.disconnect();
    };
  }, [recommendData, isLastPage, page, target]);

  return (
    <div className="dropdown-container" ref={contRef}>
      <ul>
        <TodoDropList
          recommendResult={recommendResult}
          handleItemClick={handleDropDownClick}
          originText={recommendData?.q}
        />
      </ul>
      {isLoading ? (
        <FaSpinner
          className="spinner"
          aria-label="Loading More Data"
          role="status"
        />
      ) : (
        inpText &&
        recommendData &&
        !isLastPage &&
        recommendData.total >= MAX_SUGGESTIONS && (
          <div ref={target} role="status">
            <MoreIcon ariaLabel="더 많은 항목이 있습니다. 항목 로드를 위해서 스크롤을 내리세요." />
          </div>
        )
      )}
    </div>
  );
};

export default TodoDropDown;
