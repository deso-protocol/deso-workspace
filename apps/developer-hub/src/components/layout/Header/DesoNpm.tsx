import { CopyBlock, nord } from 'react-code-blocks';

export const DesoNpm = () => {
  return (
    <div className="flex-grow mr-6 ml-20 max-w-[210px] ">
      <CopyBlock
        codeBlock
        showLineNumbers={false}
        text={`npm i deso-protocol`}
        theme={nord}
        language={'text'}
      />
    </div>
  );
};
