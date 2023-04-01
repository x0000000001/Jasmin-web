import CodeCard from "./CodeCard";
import styles from "./CodesAccordion.module.css";

export default function CodesAccordion({ codes, handleLoadCode }) {
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
      <div className={`${styles.cardList} ${styles.scrollbar_cool}`}>
        {codes.map((code, i) => {
          return (
            <div key={i}>
              <CodeCard
                codeObj={code}
                handleLoadCode={handleLoadCode}
              ></CodeCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
