import { FaSpinner } from "react-icons/fa";
import React, { useState, useRef, useEffect } from "react";
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
          setIsLoading(true);
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

  const recommendList = recommendResult?.map((item: string, idx: number) => (
    <li key={idx} onClick={() => handleDropDownClick(item)}>
      {item}
    </li>
  ));

  return (
    <div className="dropdown-container" ref={contRef}>
      <ul>
        {recommendList}
        {isLoading ? (
          <FaSpinner
            className="spinner"
            aria-label="Loading More Data"
            role="status"
          />
        ) : (
          inpText &&
          recommendData &&
          recommendData.total >= MAX_SUGGESTIONS && (
            <li ref={target}>observe</li>
          )
        )}
      </ul>
    </div>
  );
};

export default TodoDropDown;
