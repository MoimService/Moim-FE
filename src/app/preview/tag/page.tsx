import { Tag } from '@/components/ui/Tag';

export default function ButtonExamples() {
  const skills = ['React', 'Next.js', 'Typescript'];
  const skillVariants = ['blue', 'purple', 'green'] as const;

  return (
    <div className="flex gap-1">
      {skills.map((skill, idx) => (
        <Tag
          key={`${skill}_idx`}
          variant={skillVariants[idx]}
          iconUrl={`/${skill}.png`}
        >
          {skill}
        </Tag>
      ))}
    </div>
  );
}
