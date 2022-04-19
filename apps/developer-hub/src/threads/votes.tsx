import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
export const Votes = () => {
  return (
    <div className="flex flex-col max-w-[20px] my-auto">
      <KeyboardArrowUpIcon
        fontSize="small"
        className="cursor-pointer hover:text-[#141674]"
      />
      <div className=" mx-auto text-sm cursor-default font-semibold max-h-[15px] my-auto align-middle">
        0
      </div>
      <KeyboardArrowDownIcon
        fontSize="small"
        className="cursor-pointer hover:text-[#3a0c0c]"
      />
    </div>
  );
};
