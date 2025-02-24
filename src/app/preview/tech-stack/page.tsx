import { backend, design, frontend } from '@/components/ui/Icon/iconRegistry';
import React from 'react';

export default function TechStackPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 p-8">
      {/* Frontend Section */}
      <section>
        <h2 className="mb-6 text-2xl font-bold">Frontend Technologies</h2>

        {/* Core */}
        <div className="mb-8 flex flex-col gap-8">
          <h3 className="text-lg font-semibold">Core</h3>
          <div className="flex flex-wrap gap-4">
            <frontend.JavascriptIcon size={24} radius="lg" />
            <frontend.TypescriptIcon size={24} radius="lg" />
            <frontend.ReactIcon size={24} radius="lg" />
            <frontend.VueIcon size={24} radius="lg" />
          </div>
          <div className="flex flex-wrap gap-4">
            <frontend.JavascriptIcon size={12} radius="lg" />
            <frontend.TypescriptIcon size={12} radius="lg" />
            <frontend.ReactIcon size={12} radius="lg" />
            <frontend.VueIcon size={12} radius="lg" />
          </div>
        </div>

        {/* Framework & Libraries */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold">Framework & Libraries</h3>
          <div className="flex flex-wrap gap-4">
            <frontend.NextIcon size={24} radius="lg" />
            <frontend.SvelteIcon size={24} radius="lg" />
          </div>
        </div>

        {/* Mobile & Others */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Mobile & Others</h3>
          <div className="flex flex-wrap gap-4">
            <frontend.ReactNativeIcon size={24} radius="lg" />
            <frontend.FlutterIcon size={24} radius="lg" />
            <frontend.SwiftIcon size={24} radius="lg" />
            <frontend.KotlinIcon size={24} radius="lg" />
            <frontend.UnityIcon size={24} radius="lg" className="bg-black" />
            <frontend.JestIcon size={24} radius="lg" />
          </div>
        </div>
      </section>

      {/* Backend Section */}
      <section>
        <h2 className="mb-6 text-2xl font-bold">Backend Technologies</h2>

        {/* Language & Runtime */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold">Language & Runtime</h3>
          <div className="flex flex-wrap gap-4">
            <backend.JavaIcon size={24} radius="lg" />
            <backend.NodeIcon size={24} radius="lg" />
            <backend.PythonIcon size={24} radius="lg" />
            <backend.GoIcon size={24} radius="lg" />
            <backend.CIcon size={24} radius="lg" />
          </div>
        </div>

        {/* Framework */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold">Framework</h3>
          <div className="flex flex-wrap gap-4">
            <backend.SpringIcon size={24} radius="lg" />
            <backend.NestIcon size={24} radius="lg" />
            <backend.ExpressIcon size={24} radius="lg" />
            <backend.DjangoIcon size={24} radius="lg" />
          </div>
        </div>

        {/* Database & Infrastructure */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">
            Database & Infrastructure
          </h3>
          <div className="flex flex-wrap gap-4">
            <backend.MySQLIcon size={24} radius="lg" />
            <backend.MongoDBIcon size={24} radius="lg" />
            <backend.FirebaseIcon size={24} radius="lg" />
            <backend.AWSIcon size={24} radius="lg" />
            <backend.DockerIcon size={24} radius="lg" />
            <backend.KubernetesIcon size={24} radius="lg" />
            <backend.GitIcon size={24} radius="lg" />
          </div>
        </div>
      </section>

      {/* Design Tools */}
      <section>
        <h2 className="mb-6 text-2xl font-bold">Design Tools</h2>
        <div className="flex flex-wrap items-center gap-4">
          <design.FigmaIcon size={24} radius="lg" />
          <design.ZeplinIcon size={24} radius="lg" />
          <design.SketchIcon size={24} radius="lg" />
        </div>
      </section>
    </div>
  );
}
