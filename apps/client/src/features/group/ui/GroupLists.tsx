import { useGroupStore, Button } from '../../../shared';

export const GroupLists = () => {
  const { role } = useGroupStore();

  return (
    <div className='mx-auto'>
        {
          role === 'ADMIN' && (
            <Button type="button">
              Create a List
            </Button>
          )
        }
      <ul className='border-2 mx-auto'></ul>
    </div>
  );
};
