import classNames from 'classnames';

interface BreadcrumbProps {
  link?: string;
}

function Breadcrumb({ link }: BreadcrumbProps) {
  return (
    <div className="flex gap-1.5 items-center text-[23px] leading-[27px] font-medium">
      <span
        className={classNames(
          link
            ? 'text-active-breadcrumb-title underline'
            : 'text-passiveLinkColor'
        )}
      >
        Traits Dashboard{' '}
      </span>{' '}
      {link && (
        <>
          <span className="text-passiveLinkColor">{'>'}</span>{' '}
          <span className="text-passiveLinkColor">{link}</span>{' '}
        </>
      )}
    </div>
  );
}

export { Breadcrumb };
