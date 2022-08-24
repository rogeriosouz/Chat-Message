import { useContext, useEffect, useRef, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { Message } from '../components/Message';
import { AppContext } from '../context/AuthGoogle';
import { MessagingService } from '../services/messaging';

type MessagesProps = [
  {
    id: string;
    data: {
      creatAt: {
        nanoseconds: number;
        seconds: number;
      };
      dateMessage: Date;
      message: string;
      photoUrl: string;
      userId: string;
    };
  }
];

export function Home() {
  const body = useRef<HTMLDivElement | null>(null);
  const { user, isLogin } = useContext(AppContext);
  const router = useNavigate();
  const [messageIput, setMessageIput] = useState('');
  const [messages, setMessages] = useState<MessagesProps>([
    {
      data: {
        creatAt: {
          nanoseconds: 0,
          seconds: 0,
        },
        dateMessage: new Date(),
        message: '',
        photoUrl: '',
        userId: '',
      },
      id: '',
    },
  ]);

  useEffect(() => {
    if (body.current) {
      if (body.current.scrollHeight > body.current.offsetHeight) {
        body.current.scrollTop =
          body.current.scrollHeight - body.current.offsetHeight;
      }
    }
  });

  useEffect(() => {
    if (!isLogin) {
      router('/login');
    }

    const getMessage = MessagingService.getMessage(setMessages);

    return () => {
      getMessage();
    };
  }, []);

  return (
    <section className="w-full h-screen flex items-center justify-center flex-col gap-4">
      <div className="gap-2 items-center sm:flex hidden">
        <h1 className="text-2xl font-bold">Chat realTime</h1>
      </div>

      <div className="sm:max-w-[700px] w-full sm:h-[500px] h-[100vh] shadow-2xl border border-[#00000028] rounded flex flex-col items-center justify-center">
        <div
          style={{
            backgroundImage:
              'url("https://i.pinimg.com/564x/cf/14/0d/cf140dac517f37fc801b6b91aaf76fea--originals.jpg")',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          className="flex-2 w-full h-full pl-5 pr-5 overflow-auto"
          ref={body}
        >
          <div className="w-full m-auto h-full">
            {messages?.map((message) => (
              <div key={message.id}>
                {message.data.creatAt !== null && (
                  <div className="w-full">
                    {message.data.userId === user.userId ? (
                      <Message
                        isUser={true}
                        imgUrl={message.data.photoUrl}
                        message={message.data.message}
                        date={new Date(message.data?.creatAt?.seconds * 1000)}
                      />
                    ) : (
                      <Message
                        isUser={false}
                        imgUrl={message.data.photoUrl}
                        message={message.data.message}
                        date={new Date(message.data?.creatAt?.seconds * 1000)}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-[50px]">
          <div className="max-w-[400px] p-3 flex gap-4 items-center m-auto h-full">
            <input
              className="border border-[#30303056] shadow-xl w-full pl-2 pr-3 pt-1 pb-1 rounded-2xl outline-none"
              type="text"
              placeholder="Mensagen"
              onChange={(e) => setMessageIput(e.target.value)}
              value={messageIput}
            />
            <button
              disabled={messageIput.length <= 0}
              className="rounded-full bg-[#128C7E] w-[44px] h-[37px] text-white"
              onClick={() => {
                MessagingService.addNewMessage({
                  userId: user.userId,
                  message: messageIput,
                  photoUrl: user.photoUrl,
                });

                setMessageIput('');
              }}
            >
              <div className="w-[20px] h-[20px] flex items-center m-auto">
                <IoMdSend fontSize={22} color={'#fff'} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
