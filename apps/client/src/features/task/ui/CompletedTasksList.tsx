import { AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import { Task } from 'prisma/prisma-client';
import { FC } from 'react';
import { TaskItem } from '../../../entities/task';

interface IProps {
  tasks: Task[];
  onToggleComplete: (e: any) => void;
  onOpenTaskSidebar: (e: any) =>  void
  count: number
}

export const CompletedTasksList: FC<IProps> = ({ tasks, onToggleComplete,onOpenTaskSidebar,count }) => {
  return (
    <Accordion sx={{ backgroundColor: 'transparent' }}>
      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        <Typography
          sx={{
            opacity: 1,
            backgroundColor: 'white',
            padding: '10px 15px',
            borderRadius: '10px',
          }}
        >
          Completed Tasks |  {count}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ul>
          {tasks?.map((task) => (
            <TaskItem
              onToggleCompleteTask={onToggleComplete}
              onOpenTaskSidebar={onOpenTaskSidebar}
              key={task.id}
              task={task}
            />
          ))}
        </ul>
      </AccordionDetails>
    </Accordion>
  );
};