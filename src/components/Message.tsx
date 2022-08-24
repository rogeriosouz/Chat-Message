import classNames from 'classnames';

type MessageProps = {
  imgUrl: string;
  message: string;
  isUser: boolean;
  date: Date;
};

function convertDate(date: Date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes.toString().length === 1) {
    return `${hours}:0${minutes}`;
  }
  if (hours.toString().length === 1) {
    return `0${hours}:${minutes}`;
  }

  return `${hours}:${minutes}`;
}

export function Message({ imgUrl, message, isUser, date }: MessageProps) {
  return (
    <div
      className={classNames('w-full flex h-[70px] items-center gap-3', {
        'justify-start': isUser === false,
        'justify-end': isUser,
      })}
    >
      {!isUser ? (
        <>
          <div className="w-8 h-8 rounded-[50%] overflow-hidden">
            <img src={imgUrl} alt="foto-Perfil" className="w-[32px] h-[32px]" />
          </div>
          <div className="min-w-min bg-[#EDF8F5] rounded pl-2 pr-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[12px] font-medium text-black">
                {convertDate(date)}
              </span>
              <p className="text-black">{message}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="min-w-min bg-[#DCF8C6] rounded pl-2 pr-2">
            <div className="flex items-center justify-between gap-3">
              <p className="text-black">{message}</p>
              <span className="text-[12px] font-medium text-black">
                {convertDate(date)}
              </span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-[50%] overflow-hidden">
            <img src={imgUrl} alt="foto-Perfil" className="w-[32px] h-[32px]" />
          </div>
        </>
      )}
    </div>
  );
}
