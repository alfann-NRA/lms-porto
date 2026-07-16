'use client';
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { FileText, CheckCircle, Clock } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Task = {
  id: string;
  assignmentId: string;
  content: string;
  course: string;
  status: string;
};

type Columns = {
  [key: string]: {
    name: string;
    items: Task[];
    icon: any;
    colorClass: string;
  };
};

const initialColumns: Columns = {
  TODO: {
    name: 'Tugas Baru',
    icon: FileText,
    colorClass: 'text-accent border-accent',
    items: [],
  },
  IN_PROGRESS: {
    name: 'Sedang Dikerjakan',
    icon: Clock,
    colorClass: 'text-primary border-primary',
    items: [],
  },
  DONE: {
    name: 'Selesai',
    icon: CheckCircle,
    colorClass: 'text-green-500 border-green-500',
    items: [],
  },
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState(initialColumns);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/submissions');
      if (res.ok) {
        const data: Task[] = await res.json();
        const newCols = { ...initialColumns };
        // Reset items
        Object.keys(newCols).forEach(key => newCols[key].items = []);
        
        data.forEach(task => {
          const colId = task.status === 'PENDING' ? 'TODO' : task.status === 'GRADED' ? 'DONE' : task.status;
          if (newCols[colId]) {
            newCols[colId].items.push(task);
          } else {
             newCols['TODO'].items.push(task);
          }
        });
        setColumns({ ...newCols });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateTaskStatus = async (taskId: string, assignmentId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/submissions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, assignmentId, status: newStatus })
      });
      if (res.ok) {
        const updated = await res.json();
        // If it was a new submission, we should re-fetch to get the real DB id
        if (taskId.startsWith('new-')) {
          fetchTasks();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      removed.status = destination.droppableId;
      destItems.splice(destination.index, 0, removed);
      
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
      
      // Update to DB
      updateTaskStatus(removed.id, removed.assignmentId, destination.droppableId);
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full h-full font-sans">
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(columns).map(([columnId, column]) => {
          const Icon = column.icon;
          return (
            <div key={columnId} className="flex flex-col w-full md:w-1/3 bg-muted/50 rounded-2xl p-4 border-2 border-border shadow-sm">
              <div className="flex items-center gap-2 mb-4 p-2">
                <Icon className={cn("w-6 h-6", column.colorClass.split(' ')[0])} />
                <h2 className="text-xl font-heading font-bold text-foreground">{column.name}</h2>
                <span className="ml-auto bg-card px-2 py-1 rounded-full text-xs font-bold border-2 border-border shadow-sm">
                  {column.items.length}
                </span>
              </div>
              
              <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={cn(
                      "flex-1 min-h-[400px] p-2 rounded-xl transition-colors",
                      snapshot.isDraggingOver ? "bg-primary/5 border-2 border-dashed border-primary" : "bg-transparent border-2 border-transparent"
                    )}
                  >
                    {column.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={cn(
                              "user-select-none p-4 mb-4 bg-card rounded-xl border-2 shadow-sm transition-all group",
                              snapshot.isDragging ? "shadow-xl scale-105 rotate-2 border-primary" : "border-border hover:border-primary/50 hover:shadow-md"
                            )}
                          >
                            <span className="inline-block px-2 py-1 bg-accent/10 text-accent rounded-md text-xs font-bold mb-2">
                              {item.course}
                            </span>
                            <p className="text-foreground font-medium">{item.content}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}
