import styles from './SearchResult.module.css'
import { Flex, Select } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';

interface dataItem {
  title: string,
  option: string,
}

interface SearchResultCardProps {
  data: dataItem,
  index: number,
  onDelete: (index: number) => void,
}


const initData = [{
  title: '价格',
  option: '999-1999',
},{
  title: '品牌',
  option: 'Apple',
}]

function SearchResultCard(props: SearchResultCardProps){
  return (
    <Flex className={styles.searchResultCard}>
      <Flex align="center">
        <div>{props.data.title}</div>
        <div>{props.data.option}</div>
      </Flex>
      <CloseCircleOutlined className={styles.closeIcon} onClick={()=>props.onDelete(props.index)}/>
    </Flex>
  )
}

function AiRecommend(){
  return (
    <Flex className={styles.aiRecommend}>
      <div>Ai智能推荐</div>
    </Flex>
  )
}

function SearchResult() {
  const [data,setData] = useState(initData);
  const handleDelete = (index: number) => {
    setData(prevData => prevData.filter((item, i) => i !== index));
  };
  return (
    <Flex className={styles.resultContainer}>
      <Flex className={styles.searchResult}>
        {/* 需要更改 */}
        <p>搜索结果: 共{data.length}条</p>
        {
          data.map((item: { title: string; option: string; }, index: number)=>{
            return <SearchResultCard onDelete={handleDelete} key={item.title} data={item} index={index} />
          })
        }
      </Flex>
      <Flex className={styles.selectResult}>
        <Flex className={styles.selectInput}>
          <div className={styles.selectLabel}>排序方式:</div>
          <Select
            options={[
              {
                label: '价格',
                value: 'price',
              },
              {
                label: '评分',
                value: 'rating',
              },
              {
                label:'销量',
                value: 'sales',
              }
            ]}
            defaultValue={'price'}
            
          />
        </Flex>
        <AiRecommend />
      </Flex>
    </Flex>
  )
}

export default SearchResult