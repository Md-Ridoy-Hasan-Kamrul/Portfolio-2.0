import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { FiArrowUpRight } from 'react-icons/fi';
import { EXPERIENCE } from '../../data/experience';
import { LIME, SURFACE, TEXT, BODY } from '../../constants/theme';
import { CV_PDF_PATH, CV_DOWNLOAD_NAME } from '../../constants/site';
import { useSectionSpacing } from '../../hooks/useSectionSpacing';

export function ExperienceSection() {
  const sRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { py, mb } = useSectionSpacing();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ex-row',
        { opacity: 0, y: 36 },
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
            05 / Experience
          </span>
          <div
            className='flex-1 h-px'
            style={{ background: 'rgba(255,255,255,0.05)' }}
          />
        </div>

        <div className='space-y-3'>
          {EXPERIENCE.map((item, i) => (
            <div
              key={i}
              className='ex-row opacity-0 rounded-2xl px-7 py-6 cursor-pointer transition-all duration-400'
              style={{
                background: active === i ? SURFACE : 'transparent',
                border: `1px solid ${active === i ? item.color + '28' : 'rgba(255,255,255,0.04)'}`,
              }}
              onClick={() => setActive(i)}
            >
              <div className='grid grid-cols-12 gap-4 items-center'>
                <div className='col-span-1'>
                  <span
                    className="font-['Clash_Display'] font-semibold text-5xl transition-all duration-300"
                    style={{
                      color:
                        active === i ? item.color : 'rgba(255,255,255,0.08)',
                    }}
                  >
                    {item.num}
                  </span>
                </div>

                <div className='col-span-12 sm:col-span-4'>
                  <div
                    className='font-mono text-xs tracking-widest mb-1 transition-colors duration-300'
                    style={{ color: active === i ? item.color : BODY }}
                  >
                    {item.company}
                  </div>
                  <h3
                    className="font-['Clash_Display'] font-semibold text-lg"
                    style={{ color: TEXT }}
                  >
                    {item.role}
                  </h3>
                </div>

                <div className='col-span-6 sm:col-span-2'>
                  <span
                    className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-xs transition-all duration-300'
                    style={{
                      background:
                        active === i
                          ? `${item.color}12`
                          : 'rgba(255,255,255,0.04)',
                      color: active === i ? item.color : BODY,
                      border: `1px solid ${active === i ? item.color + '22' : 'rgba(255,255,255,0.04)'}`,
                    }}
                  >
                    {item.period.includes('Present') && (
                      <span
                        className='w-1.5 h-1.5 rounded-full animate-pulse'
                        style={{ background: active === i ? item.color : LIME }}
                      />
                    )}
                    {item.period}
                  </span>
                </div>

                <div className='col-span-6 sm:col-span-5 flex flex-wrap gap-2 justify-end'>
                  {item.stats.map((s) => (
                    <span
                      key={s}
                      className='px-2.5 py-1 rounded-md font-mono text-xs transition-all duration-300'
                      style={{
                        background:
                          active === i
                            ? `${item.color}12`
                            : 'rgba(255,255,255,0.04)',
                        color: active === i ? item.color : BODY,
                        border: `1px solid ${active === i ? item.color + '22' : 'rgba(255,255,255,0.04)'}`,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {active === i && (
                <div
                  className='mt-5'
                  style={{ paddingLeft: 'calc(8.33% + 16px)' }}
                >
                  <p
                    className='text-base sm:text-lg leading-relaxed'
                    style={{ color: BODY }}
                  >
                    {item.desc}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className='mt-10 flex justify-start pl-[calc(8.33%+28px)]'>
          <a
            href={CV_PDF_PATH}
            download={CV_DOWNLOAD_NAME}
            className='inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 group'
            style={{ color: TEXT, border: '1px solid rgba(255,255,255,0.12)' }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = `${LIME}60`;
              el.style.background = `${LIME}10`;
              el.style.color = LIME;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'rgba(255,255,255,0.12)';
              el.style.background = 'transparent';
              el.style.color = TEXT;
            }}
          >
            Download full resume
            <FiArrowUpRight className='w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform' />
          </a>
        </div>
      </div>
    </section>
  );
}
