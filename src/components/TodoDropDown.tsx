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
        const { data } = await searchRecommendation(recommendData.q, page + 1);
        if (data.result.length) {
          setPage((prevPage) => prevPage + 1);
          setRecommendResult((prevResult) => [...prevResult, ...data.result]);
        } else {
          setIsLastPage(true);
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
        {inpText && recommendData && recommendData.total >= MAX_SUGGESTIONS && (
          <li ref={target}>observe</li>
        )}
      </ul>
    </div>
  );
};

export default TodoDropDown;
