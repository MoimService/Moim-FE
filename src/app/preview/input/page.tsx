import { Input } from '@/components/ui/Input';

export default function ButtonExamples() {
  return (
    <div className="w-fill h-full bg-BG p-10 text-white">
      <h1 className="typo-head1">Normal</h1>
      <h2>large normal</h2>
      <div className="mb-4 w-[460px]">
        <Input placeholder="Default" />
      </div>

      <h2>large typing</h2>
      <div className="mb-4 w-[460px]">
        <Input placeholder="Default" defaultValue={'Typing'} />
      </div>

      <h2>large done</h2>
      <div className="mb-4 w-[460px]">
        <Input defaultValue="Done" state="success" />
      </div>

      <h2>large error</h2>
      <div className="mb-4 w-[460px]">
        <Input defaultValue="Error" errorMessage="필수 입력 사항입니다." />
      </div>

      <h2>large disable</h2>
      <div className="mb-4 w-[460px]">
        <Input placeholder="Disabled" disabled />
      </div>

      <h2>small normal</h2>
      <div className="mb-4 w-[460px]">
        <Input placeholder="Default" inputSize="s" />
      </div>

      <h2>small typing</h2>
      <div className="mb-4 w-[460px]">
        <Input placeholder="Default" defaultValue={'Typing'} inputSize="s" />
      </div>

      <h2>small done</h2>
      <div className="mb-4 w-[460px]">
        <Input defaultValue="Done" state="success" inputSize="s" />
      </div>

      <h2>small error</h2>
      <div className="mb-4 w-[460px]">
        <Input
          defaultValue="Error"
          errorMessage="필수 입력 사항입니다."
          inputSize="s"
        />
      </div>

      <h2>small disable</h2>
      <div className="mb-4 w-[460px]">
        <Input placeholder="Disabled" disabled inputSize="s" />
      </div>

      <h1 className="typo-head1">Password</h1>
      <h2>large normal</h2>
      <div className="mb-4 w-[460px]">
        <Input placeholder="Default" type="password" />
      </div>

      <h2>large typing</h2>
      <div className="mb-4 w-[460px]">
        <Input placeholder="Default" defaultValue={'Typing'} type="password" />
      </div>

      <h2>large done</h2>
      <div className="mb-4 w-[460px]">
        <Input defaultValue="Done" state="success" type="password" />
      </div>

      <h2>large error</h2>
      <div className="mb-4 w-[460px]">
        <Input
          defaultValue="Error"
          errorMessage="필수 입력 사항입니다."
          type="password"
        />
      </div>

      <h2>large disable</h2>
      <div className="mb-4 w-[460px]">
        <Input placeholder="Disabled" disabled type="password" />
      </div>

      <h2>small normal</h2>
      <div className="mb-4 w-[460px]">
        <Input placeholder="Default" inputSize="s" type="password" />
      </div>

      <h2>small typing</h2>
      <div className="mb-4 w-[460px]">
        <Input
          placeholder="Default"
          defaultValue={'Typing'}
          inputSize="s"
          type="password"
        />
      </div>

      <h2>small done</h2>
      <div className="mb-4 w-[460px]">
        <Input
          defaultValue="Done"
          state="success"
          inputSize="s"
          type="password"
        />
      </div>

      <h2>small error</h2>
      <div className="mb-4 w-[460px]">
        <Input
          defaultValue="Error"
          errorMessage="필수 입력 사항입니다."
          inputSize="s"
          type="password"
        />
      </div>

      <h2>small disable</h2>
      <div className="mb-4 w-[460px]">
        <Input placeholder="Disabled" disabled inputSize="s" type="password" />
      </div>

      <h1 className="typo-head1">width 커스텀</h1>
      <div className="mb-4 w-[260px]">
        <Input placeholder="Default" inputSize="s" />
      </div>
      <div className="mb-4 w-[500px]">
        <Input placeholder="Default" inputSize="s" />
      </div>

      <Input className="w-[200px]" placeholder="Default" inputSize="s" />
    </div>
  );
}
