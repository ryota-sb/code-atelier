// 日付のフォーマットをブラウザの言語設定に応じて整形する(yyyy/mm/dd, mm/dd/yyyy)
export const getFormattedDate = (date: Date): string => new Date(date).toLocaleDateString();

// 投稿日から3日以内かどうかを判定
export const isWithinThreeDays = (publishDate: Date) => {
  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000; // 3日をミリ秒に変換
  return _getMillisecondsSincePublication(publishDate) <= THREE_DAYS_IN_MS;
 }

// 投稿日時から現在までの経過時間をミリ秒単位で取得
const _getMillisecondsSincePublication = (publishDate: Date): number => {
  const currentTimestamp = new Date().getTime();
  const publishTimestamp = new Date(publishDate).getTime();
  return currentTimestamp - publishTimestamp;
};
