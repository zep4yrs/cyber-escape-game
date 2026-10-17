import type { Block, L } from '../content/types';
import { useLang } from '../i18n/LangContext';

export function RichBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose">
      {blocks.map((block, index) => (
        <RichBlock key={index} block={block} />
      ))}
    </div>
  );
}

function RichBlock({ block }: { block: Block }) {
  const { pick } = useLang();
  const pickAll = (items: L[]) => items.map((item) => pick(item));

  switch (block.kind) {
    case 'p':
      return <p>{pick(block.text)}</p>;

    case 'lead':
      return <p className="prose__lead">{pick(block.text)}</p>;

    case 'list':
      return block.ordered ? (
        <ol className="prose__list prose__list--ordered">
          {pickAll(block.items).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul className="prose__list">
          {pickAll(block.items).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );

    case 'steps':
      return (
        <ol className="prose__steps">
          {block.items.map((step, i) => (
            <li key={i}>
              <span className="prose__step-n mono" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <strong>{pick(step.title)}</strong>
                <p>{pick(step.body)}</p>
              </div>
            </li>
          ))}
        </ol>
      );

    case 'callout':
      return (
        <aside className={`callout callout--${block.tone}`}>
          {block.title ? <p className="callout__title mono">{pick(block.title)}</p> : null}
          <p>{pick(block.text)}</p>
        </aside>
      );

    case 'table':
      return (
        <figure className="dtable">
          {block.data.caption ? <figcaption className="mono">{pick(block.data.caption)}</figcaption> : null}
          <div className="dtable__scroll">
            <table>
              <thead>
                <tr>
                  {block.data.head.map(pick).map((cell, i) => (
                    <th key={i} scope="col">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={block.data.mono ? 'is-mono' : undefined}>
                {block.data.rows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map(pick).map((cell, ci) => (
                      <td key={ci}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </figure>
      );

    case 'code':
      return (
        <figure className="codeblock">
          {block.label ? <figcaption className="mono">{pick(block.label)}</figcaption> : null}
          <pre>
            <code>{block.code}</code>
          </pre>
          {block.caption ? <p className="codeblock__caption muted">{pick(block.caption)}</p> : null}
        </figure>
      );

    case 'data':
      return (
        <aside className="datalist">
          {block.label ? <p className="datalist__label mono">{pick(block.label)}</p> : null}
          <dl>
            {block.items.map((item, i) => (
              <div key={i} className="datalist__row">
                <dt>{pick(item.label)}</dt>
                <dd>{pick(item.value)}</dd>
              </div>
            ))}
          </dl>
        </aside>
      );

    case 'compare':
      return (
        <div className="compare">
          <div className="compare__col">
            <p className="compare__title mono">{pick(block.leftTitle)}</p>
            <ul className="prose__list">
              {pickAll(block.leftItems).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="compare__col compare__col--right">
            <p className="compare__title mono">{pick(block.rightTitle)}</p>
            <ul className="prose__list">
              {pickAll(block.rightItems).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      );

    default:
      return null;
  }
}
