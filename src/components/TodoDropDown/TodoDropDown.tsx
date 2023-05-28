import React, { useState, useRef, useEffect, useCallback } from "react";
import TodoDropList from "../TodoDropList/TodoDropList";
import MoreIcon from "../common/MoreIcon";
import { RecommendDataType, TodoDropDownPropsType } from "../../types/todo";
import { searchRecommendation } from "../../api/search";
import SpinnerIcon from "../common/SpinnerIcon/SpinnerIcon";
import "./TodoDropDown.css";

const TodoDropDown: React.FC<TodoDropDownPropsType> = ({
  recommendDataState,
  handleDropDownClick,
  inpText,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const contRef = useRef<HTMLDivElement>(null);
  const target = useRef<HTMLDivElement>(null);

  const { recommendData, setRecommendData } = recommendDataState;

  useEffect(() => {
    if (contRef.current) {
      const scrollTopInfo = contRef.current.scrollTop;
      scrollTopInfo && contRef.current.scrollTo(0, 0);
    }
  }, [inpText]);

  const handleIntersection = useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const isIntersecting = entries[0].isIntersecting;
      if (!isIntersecting) return;

      const { q, page, limit, total } = recommendData;
      const isLastPage = page * limit >= total;
      if (isLastPage) return;

      console.info("더 많은 데이터 요청");
      try {
        setIsLoading(true);
        const { data }: { data: RecommendDataType } =
          await searchRecommendation(q, page + 1);
        setIsLoading(false);
        setRecommendData((prev) => {
          return {
            ...prev,
            page: data.page,
            result: [...prev.result, ...data.result],
          };
        });
      } catch (error) {
        setIsLoading(false);
        console.error(error);
        alert("something went wrong");
      }
    },
    [recommendData, setRecommendData]
  );

  useEffect(() => {
    if (!target.current) return;

    const options = { threshold: 0.5 };
    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(target.current);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection]);

  return (
    <div className="dropdown-container" ref={contRef}>
      <ul>
        <TodoDropList
          recommendResult={recommendData.result}
          handleItemClick={handleDropDownClick}
          originText={recommendData.q}
        />
      </ul>
      {isLoading ? (
        <SpinnerIcon ariaLabel="Loading More Data" iconType="center" />
      ) : (
        <div ref={target} role="status" className="load-icon">
          <MoreIcon ariaLabel="더 많은 항목이 있습니다. 항목 로드를 위해서 스크롤을 내리세요." />
        </div>
      )}
    </div>
  );
};

export default TodoDropDown;
