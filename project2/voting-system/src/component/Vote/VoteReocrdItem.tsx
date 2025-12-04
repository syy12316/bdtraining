import type { VoteRecord } from '../../store/voteStore';
import dayjs from 'dayjs';

function VoteRecordItem({ voteRecord }: { voteRecord: VoteRecord }) {
  const createTime = dayjs(voteRecord.voted_at).format('YYYY-MM-DD HH:mm:ss');
  return (
    <>
      <div className='result-item'>
        <div className='option-name'>{`${voteRecord.username} 已投票`}</div>
        <div className='vote-count'>{`投票时间：${createTime}`}</div>
      </div>
    </>
  );
}
export default VoteRecordItem;