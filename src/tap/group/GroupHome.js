import { useMatch } from 'react-router-dom';

import GroupList from './components/ui-components/GroupList';
import GroupDetail from './components/ui-components/GroupDetail';
import GroupCreate from './components/ui-components/GroupCreate';
import GroupFriends from './components/ui-components/GroupFriends';

export default function GroupHome() {
  const create = useMatch('/group/create');
  const detail = useMatch('/group/detail/:id');

  return (
    <div>
      <div className="flex pt-10">
        <GroupList />
        <div className="w-full flex flex-col md:flex-row items-centers justify-around p-5">
          {create && <GroupCreate />}
          {detail && (
            <>
              <GroupDetail /> <GroupFriends />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
