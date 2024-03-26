/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Helmet } from 'react-helmet';
import { appConfig } from '@/config/appConfig';
import { CardNews } from '@/components/atoms/CardNews/CardNews';
import { INews } from '@/repositories/newsRepository/newsRepository.types';
import { useEffect, useState } from 'react';
import { NewsRepository } from '@/repositories/newsRepository/newsRepository';
import toast from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner';
import { SimplePageTemplate } from '@/components/templates/SimplePageTemplate/SimplePageTemplate';

export const NewsScreen = () => {
  const newsRepository = new NewsRepository();

  const [newsList, setNewsList] = useState<INews[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const data = await newsRepository.listAll();
      setNewsList(data.data);
      setTimeout(() => {
        setLoading(false);
      }, 1200);
    } catch (error) {
      setLoading(false);
      toast.error('Erro ao listar Notícias');
    }
  };

  return (
    <SimplePageTemplate title="Notícias">
      <Helmet>
        <title>{`Notícias | ${appConfig?.name}`}</title>
      </Helmet>

      <div className="w-full h-full p-8 flex flex-col items-center">
        {loading && (
          <div className={'flex flex-col items-center scale-[400%]'}>
            <ThreeDots
              visible={loading}
              height="120"
              width="120"
              color="#16664e"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}

        {Boolean(newsList.length > 0) &&
          !loading &&
          newsList.map((news: INews, index: number) => (
            <CardNews
              key={index}
              seeMore
              longLength
              // @ts-ignore
              action={() => setExpandedIndex(expandedIndex === index ? null : index)}
              width="100%"
              height="auto"
              expanded={expandedIndex === index}
              date={news?.date}
              title={news?.title}
              description={news?.description}
              thumb={news?.thumb}
            />
          ))}
      </div>
    </SimplePageTemplate>
  );
};
