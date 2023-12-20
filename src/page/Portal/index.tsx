import { useState, useReducer } from "react";
import Card from "../../component/Card";
import { cardList } from "./data.js";
import { Col, Row } from "antd";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { findIndex } from "lodash";

const Portal = () => {
  const [activeId, setActiveId] = useState(null);
  const [list, setList] = useState(cardList);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  function handleChangeTask(task: any) {
    const newlist = list.map((t) => {
      if (t.id === task.id) {
        return task;
      } else {
        return t;
      }
    });
    setList(newlist);
  }

  const listHTML = list.map((item) => (
    <Card
      key={item.id}
      id={item.id}
      item={item}
      onChangeTask={handleChangeTask}
    />
  ));
  return (
    <Row gutter={[16, 16]}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext strategy={horizontalListSortingStrategy} items={list}>
          {listHTML}
        </SortableContext>
      </DndContext>
    </Row>
  );

  function handleDragStart(event: any) {
    const { active } = event;
    setActiveId(active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setList((list) => {
        const oldIndex = findIndex(list, { id: active.id });
        const newIndex = findIndex(list, { id: over.id });
        return arrayMove(list, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  }
};

export default Portal;
