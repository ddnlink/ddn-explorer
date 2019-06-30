import styles from './index.less';
import Home from './Home'
export default function () {
  let mainWidth = '100%'
  console.log('clientWidth', document.documentElement.clientWidth, 'bodyWidth', document.body.clientWidth)
  if (document.documentElement.clientWidth <= 1080) {
    mainWidth = '1080px'
    let viewport = document.querySelector("meta[name=viewport]");
    console.log('viewport', viewport)
    viewport.setAttribute('content', 'width=1080')
  }
  return (
    <div className={styles.normal}>
      <Home />
    </div>
  );
}
