import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FiArrowUpRight } from 'react-icons/fi';
import { EXPERIENCE } from '../../data/experience';
import { LIME, SURFACE, TEXT, BODY } from '../../constants/theme';
import { CV_PDF_PATH, CV_DOWNLOAD_NAME } from '../../constants/site';
import { ShaderButtons } from '../common/ShaderButtons';
import { useSectionSpacing } from '../../hooks/useSectionSpacing';

export function ExperienceSection() {
  const sRef = useRef<HTMLElement>(null);
  const { py, mb } = useSectionSpacing();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ex-row',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sRef.current,
            start: 'top 76%',
            once: true,
          },
        },
      );
    }, sRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sRef}
      id='experience'
      className='relative'
      style={{ paddingTop: py, paddingBottom: py }}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center gap-5' style={{ marginBottom: mb }}>
          <span
            className='font-mono text-xs tracking-[0.3em] uppercase'
            style={{ color: LIME }}
          >
            02 / Experience
          </span>
          <div
            className='flex-1 h-px'
            style={{ background: 'rgba(255,255,255,0.05)' }}
          />
        </div>

        <div className='space-y-4'>
          {EXPERIENCE.map((item) => (
            <article
              key={item.company + item.period}
              className='ex-row opacity-0 rounded-2xl px-6 py-7 sm:px-8 sm:py-8'
              style={{
                background: SURFACE,
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
                <div className='min-w-0'>
                  <p
                    className='font-mono text-xs tracking-[0.22em] uppercase'
                    style={{ color: item.color }}
                  >
                    {item.company}
                  </p>
                  <h3
                    className="mt-2 font-['Clash_Display'] font-semibold text-2xl sm:text-3xl leading-tight"
                    style={{ color: TEXT }}
                  >
                    {item.role}
                  </h3>
                </div>

                {item.period.includes('Present') ? (
                  <span
                    className='inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs whitespace-nowrap'
                    style={{
                      background: `${item.color}14`,
                      color: item.color,
                      border: `1px solid ${item.color}40`,
                    }}
                  >
                    <span
                      className='h-1.5 w-1.5 rounded-full'
                      style={{ background: item.color }}
                    />
                    {item.period}
                  </span>
                ) : (
                  <span
                    className='inline-flex w-fit items-center rounded-full px-3 py-1.5 font-mono text-xs whitespace-nowrap'
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      color: BODY,
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {item.period}
                  </span>
                )}
              </div>

              {item.stats.length > 0 && (
                <div className='mt-5 flex flex-wrap gap-2'>
                  {item.stats.map((stat) => (
                    <span
                      key={stat}
                      className='rounded-md px-2.5 py-1 font-mono text-xs whitespace-nowrap'
                      style={{
                        background: `${item.color}12`,
                        color: item.color,
                        border: `1px solid ${item.color}22`,
                      }}
                    >
                      {stat}
                    </span>
                  ))}
                </div>
              )}

              {item.bullets.length > 0 && (
                <ul className='mt-7 space-y-4'>
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className='flex gap-3'>
                      <span
                        className='mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full'
                        style={{ background: item.color }}
                      />
                      <span
                        className='text-base leading-relaxed'
                        style={{ color: BODY }}
                      >
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>

        <div className='mt-10'>
          <ShaderButtons href={CV_PDF_PATH} download={CV_DOWNLOAD_NAME}>
            Download full resume
            <FiArrowUpRight className='h-4 w-4' />
          </ShaderButtons>
        </div>
      </div>
    </section>
  );
}
