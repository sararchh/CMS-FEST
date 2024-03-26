import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IoEyeSharp } from 'react-icons/io5';
import { ThreeDots } from 'react-loader-spinner';

import { MainTemplate } from '@/components/templates/MainTemplate/MainTemplate';

import { ContactsRepository } from '@/repositories/contactRepository/contactRepository';
import { IContactProps, IMvContato } from '@/repositories/contactRepository/contactRepository.types';

import { NavPagination } from '@/components/atoms/NavPagination/NavPagination';
import styles from './Contact.module.css';
import { DialogConfirm } from '@/components/molecules/DialogConfirm';
import { Card } from '@/components/atoms/Card/Card';

export const Contact = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const pageQuery = queryParams.get('page');

  const mvContactsRepository = new ContactsRepository();

  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loadingActions, setLoadingActions] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const [infoPages, setInfoPages] = useState({} as Partial<IContactProps>);
  const [contacts, setContacts] = useState<IMvContato[]>([]);
  const [contact, setContact] = useState<IMvContato>();

  useEffect(() => {
    getListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageQuery]);

  const getListData = async () => {
    try {
      const data = await mvContactsRepository.listAll('', pageQuery || '1');
      setContacts(data?.data);
      setInfoPages({
        total: data?.total,
        pages: data?.pages,
        current_page: data?.current_page,
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <MainTemplate>
      <DialogConfirm
        isOpen={modalIsOpen}
        title={'Dados do Contato'}
        loading={loadingActions}
        customCssContainer={{ height: 400}}
        className={styles['dialog-contact']}
        onClose={() => setModalIsOpen(false)}
      >
        <div className={styles['header-dialog']}>
          <h2>DADOS DO CONTATO</h2>

          <section className="flex items-start flex-col mt-2 h-4/5 min-h-[270px]">
            <p>
              {' '}
              <span className="font-semibold">Nome: </span>
              {contact?.name}
            </p>
            <p>
              {' '}
              <span className="font-semibold">Email: </span>
              {contact?.email}
            </p>
            <p>
              {' '}
              <span className="font-semibold">Celular: </span>
              {contact?.phone}
            </p>
            <p className="break-words">
              {' '}
              <span className="font-semibold">Assunto: </span>
              {contact?.subject}
            </p>

            <span className="font-semibold mt-2">Mensagem: </span>
            <div className="flex items-start flex-col overflow-y-auto max-h-[150px]">
              <p>
                {contact?.message}
              </p>
            </div>
          </section>

          <button
            data-modal-hide="popup-modal"
            type="button"
            className="text-gray-500 min-w-[100px] bg-slate-200 hover:bg-slate-300  focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 font-medium rounded-lg text-sm inline-flex items-center justify-center px-5 py-2.5 text-center"
            onClick={() => setModalIsOpen(false)}
          >
            Fechar
          </button>
        </div>
      </DialogConfirm>

      <section className={styles['container']}>
        <div className={styles['header-content']}>
          <h3>Contatos</h3>
        </div>

        {loading && (
          <div className={styles['center-screen']}>
            <ThreeDots
              visible={loading}
              height="80"
              width="80"
              color="#2e7afb"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
        {!loading && (
          <div className={styles['list-data']}>
            {Boolean(contacts?.length) &&
              contacts.map((item: IMvContato, index) => (
                <div className="m-2 space-y-2" key={index}>
                  <Card>
                    <div className="flex items-center justify-between">
                      <span>
                        <h2>{item.email}</h2>
                        <p>
                          {new Date(item.date)
                            .toLocaleString('pt-BR', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false,
                            })
                            .replace(/\//g, '-')
                            .replace(',', '')}
                        </p>
                      </span>
                      <IoEyeSharp
                        className="h-6 w-6 cursor-pointer"
                        onClick={() => {
                          setModalIsOpen(true), setContact(item);
                        }}
                      />
                    </div>
                  </Card>
                </div>
              ))}
          </div>
        )}

        <div className={styles['footer-table']}>
          <span>
            <NavPagination
              infoPages={{ total: infoPages?.total, pages: infoPages?.pages }}
              currentPage={infoPages?.current_page}
            />
          </span>
        </div>
        <div style={{ height: 200 }} />
      </section>
    </MainTemplate>
  );
};
