import { Votes } from './votes';

export const Response = () => {
  return (
    <div className="border border-gray-400 py-2">
      <div className="flex  mx-9 p-1">
        <div className="flex mr-2 pr-2  ml-2">
          <Votes />
        </div>
        <div className="my-auto">
          asldfjasldkdjf asldfjlasdf lkasdfl kasdflj asldfjasldkdjf asldfjlasdf
          lkasdfl kasdflj asldfjasldkdjf asldfjlasdf lkasdfl kasdflj
          asldfjasldkdjf asldfjlasdf lkasdfl kasdflj asldfjasldkdjf asldfjlasdf
          lkasdfl kasdflj asldfjasldkdjf asldfjlasdf lkasdfl kasdflj
          asldfjasldkdjf asldfjlasdf lkasdfl kasdflj kasdflj asldfjasldkdjf
          asldfjlasdf lkasdfl kasdflj kasdflj asldfjasldkdjf asldfjlasdf lkasdfl
          kasdflj kasdflj asldfjasldkdjf asldfjlasdf lkasdfl kasdflj kasdflj
          asldfjasldkdjf asldfjlasdf lkasdfl kasdflj
        </div>
      </div>
      <div className="flex justify-around ">
        <div>reply</div> <div>tip</div>
      </div>
    </div>
  );
};
