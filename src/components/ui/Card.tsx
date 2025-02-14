'use client';

import { cn } from '@/util/cn';
import { cva } from 'class-variance-authority';
import Image from 'next/image';
import * as React from 'react';

type CardType = 'vertical' | 'horizon';

interface CardContextValue {
  type?: CardType;
  imgUrl: string;
}

const CardContext = React.createContext<CardContextValue>({
  type: 'vertical',
  imgUrl: '',
});

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: CardType;
  imgUrl: string;
}

const useCardContext = () => {
  const context = React.useContext(CardContext);
  return context;
};

const cardVariants = cva('flex bg-BG p-4', {
  variants: {
    type: {
      vertical: ['flex-col w-[466px]'],
      horizon: ['flex-row w-[1340px]'],
    },
  },
  defaultVariants: {
    type: 'vertical',
  },
});

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, type = 'vertical', imgUrl = '', ...props }, ref) => {
    return (
      <CardContext.Provider value={{ type, imgUrl }}>
        <div
          ref={ref}
          className={cn(cardVariants({ type }), className)}
          {...props}
        />
      </CardContext.Provider>
    );
  },
);
Card.displayName = 'Card';

const cardThumbnailVariants = cva(
  'flex flex-col space-y-1.5 rounded-[20px] object-cover',
  {
    variants: {
      type: {
        vertical: ['mt-[12px] w-[432px] h-[252px]'],
        horizon: ['ml-[24px] w-[252px] h-[208px]'],
      },
    },
    defaultVariants: {
      type: 'vertical',
    },
  },
);

const CardThumbnail = ({
  className,
  ...props
}: Omit<React.HTMLAttributes<HTMLImageElement>, 'children'> & {
  className?: string;
}) => {
  const { type, imgUrl } = useCardContext();

  return (
    <Image
      src={imgUrl}
      alt="card_img"
      width={434}
      height={252}
      className={cn(cardThumbnailVariants({ type }), className)}
      {...props}
    />
  );
};
CardThumbnail.displayName = 'CardThumbnail';

const CardCategory = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('type-botton1 mt-[10px] text-sm text-main', className)}
    {...props}
  />
));
CardCategory.displayName = 'CardCategory';

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'typo-head2 mt-4 font-semibold leading-none tracking-tight text-Cgray800',
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('type-botton1 mt-3 text-sm text-Cgray500', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const cardContentVariants = cva('flex flex-col', {
  variants: {
    type: {
      vertical: ['mt-[12px]'],
      horizon: ['ml-[24px] w-[690px]'],
    },
  },
  defaultVariants: {
    type: 'vertical',
  },
});

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { type } = useCardContext();

  return (
    <div
      ref={ref}
      className={cn(cardContentVariants({ type }), className)}
      {...props}
    >
      {children}
    </div>
  );
});
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardCategory,
  CardThumbnail,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
