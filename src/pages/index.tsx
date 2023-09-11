import styles from './index.less';
import { useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';


const HomePage = () => {
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false)
  const handeInput = (e: any) => {
    setCopied(false)
    const value = e.target.value

    const inputDate = new Date(value);
    if (!isNaN(inputDate.getTime())) {
      // 格式化日期并输出
      const formattedDate = formatDateToUnicode(inputDate);
      setResult(formattedDate)
      console.log("格式化后的日期：" + formattedDate);
    } else {
      console.log("无效的日期格式！");
    }
  }

  const formatDateToUnicode = (inputDate: Date) => {
    // 获取年、月、日
    const year = inputDate.getFullYear().toString();
    const month = (inputDate.getMonth() + 1).toString();
    const day = inputDate.getDate().toString();

    // Unicode 上标和下标字符的映射
    const superscriptMap = {
      '0': '⁰',
      '1': '¹',
      '2': '²',
      '3': '³',
      '4': '⁴',
      '5': '⁵',
      '6': '⁶',
      '7': '⁷',
      '8': '⁸',
      '9': '⁹',
    };

    const subscriptMap = {
      '0': '₀',
      '1': '₁',
      '2': '₂',
      '3': '₃',
      '4': '₄',
      '5': '₅',
      '6': '₆',
      '7': '₇',
      '8': '₈',
      '9': '₉',
    };

    // 格式化年份、月份和日期
    const formattedYear = year.split('').map(char => superscriptMap[char]).join('');
    const formattedMonth = month.split('').map(char => subscriptMap[char]).join('');
    const formattedDay = day.split('').map(char => subscriptMap[char]).join('');

    // 构建最终的格式化字符串
    return `ᰔᩚ${formattedYear}/${formattedMonth}.${formattedDay}\u1d55\u0308`;
  }

  const handleCopySuccess = () => {
    setCopied(true);
    const timer = setTimeout(() => {
      setCopied(false)
      clearTimeout(timer)
    }, 3000)
  }

  return (
    <div className={styles.home}>
      <div className={styles.formItem}>
        <label>原始文字</label>
        <input onInput={handeInput}/>
      </div>
      <div className={styles.formItem}>
        <label>unicode 文字</label>
        <input disabled value={result}/>
      </div>

      <CopyToClipboard text={result}
                       onCopy={handleCopySuccess}>
        <button>{copied ? '复制成功' : '复制'}</button>
      </CopyToClipboard>
    </div>
  );
}

export default HomePage
