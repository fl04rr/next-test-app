import Layout from '../components/layout';
import styles from './styles.module.scss';

export default function Custom404() {
  return (
    <Layout home={false}>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>404</h1>
        <p className={styles.subtext}>page not found</p>
      </div>
    </Layout>
  );
}
