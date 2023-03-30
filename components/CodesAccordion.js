import CodeCard from "./CodeCard";
import styles from "./CodesAccordion.module.css";

export default function CodesAccordion({ title, codes, handleLoadCode }) {
  const addfn = `
   export
  fn add(reg u64 a, reg u64 b) -> reg u64 {
    reg u64 r;
    r = a + b;

    return r;
  }

export 
fn print() -> reg u64 {
  reg u64 x;
  x = 2;
  return x;
}
  `;

  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.cardList}>
        {codes.map((code, i) => {
          return (
            <div key={i}>
              <CodeCard
                name={code.title}
                code={code.code}
                owner={code.user_id}
                handleLoadCode={handleLoadCode}
              ></CodeCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
