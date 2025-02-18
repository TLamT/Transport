export const SearchBar = ({ Search, setSearch }) => {
    const handleChange = (e) => {
      const value = e.target.value;
      // 使用正則表達式檢查輸入內容是否只包含數字和英文字母
      const regex = /^[a-zA-Z0-9]*$/;
      if ((regex.test(value) || value === '') && value.length<= 5) { // 允許空字符串
        setSearch(value.toUpperCase());
      }
    };
  
    return (
      <div className="flex justify-center gap-2 mt-10">
        <input 
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          placeholder="請輸入車站名稱"
          type="text"
          value={Search}
          onChange={handleChange} // 使用 handleChange 函數
        />
      </div>
    );
  };