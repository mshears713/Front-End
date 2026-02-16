import { DocCallout } from '@/components/DocCallout/DocCallout';
import { CodeBlock, Prose, SectionHeading, SubHeading } from '@/components/DocPrimitives/DocPrimitives';

const FrameworksOverview = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Frameworks Overview</h1>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-lg">
          A high-level look at the most popular frontend frameworks and how they compare — useful context for understanding why this project uses React + Vite.
        </p>
      </div>

      {/* React */}
      <SectionHeading id="react">React</SectionHeading>
      <Prose>
        <p>
          <strong className="text-foreground">React</strong> is a component-based UI library maintained by Meta.
          It uses a virtual DOM and one-way data flow, making state management explicit.
          The ecosystem is enormous — routing, state, forms, and testing all have mature solutions.
        </p>
      </Prose>
      <CodeBlock language="tsx">{`function Greeting({ name }: { name: string }) {\n  return <h1>Hello, {name}!</h1>;\n}`}</CodeBlock>
      <DocCallout variant="info">
        This demo project is built with React 18 + TypeScript. All patterns shown here are React-idiomatic.
      </DocCallout>

      {/* Vue */}
      <SectionHeading id="vue">Vue</SectionHeading>
      <Prose>
        <p>
          <strong className="text-foreground">Vue</strong> is a progressive framework with a gentler learning curve.
          It uses a reactivity system based on proxies (Vue 3) and supports both Options API and Composition API.
          Vue's single-file components (<code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">.vue</code>) bundle template, script, and style together.
        </p>
      </Prose>
      <CodeBlock language="vue">{`<script setup lang="ts">\nconst name = ref('World')\n</script>\n\n<template>\n  <h1>Hello, {{ name }}!</h1>\n</template>`}</CodeBlock>

      {/* Angular */}
      <SectionHeading id="angular">Angular</SectionHeading>
      <Prose>
        <p>
          <strong className="text-foreground">Angular</strong> is a full-featured platform by Google. It ships with routing,
          forms, HTTP client, dependency injection, and more out of the box. It uses TypeScript by default
          and follows a module-based architecture. Ideal for large enterprise apps with strict conventions.
        </p>
      </Prose>
      <CodeBlock language="typescript">{`@Component({\n  selector: 'app-greeting',\n  template: '<h1>Hello, {{ name }}!</h1>'\n})\nexport class GreetingComponent {\n  name = 'World';\n}`}</CodeBlock>
      <DocCallout variant="warning">
        Angular has a steeper learning curve due to decorators, modules, RxJS, and DI. Great power, great complexity.
      </DocCallout>

      {/* Svelte */}
      <SectionHeading id="svelte">Svelte</SectionHeading>
      <Prose>
        <p>
          <strong className="text-foreground">Svelte</strong> compiles components at build time into efficient imperative code —
          no virtual DOM. The result is smaller bundles and faster runtime. Svelte's syntax is minimal and
          feels closest to plain HTML/JS.
        </p>
      </Prose>
      <CodeBlock language="svelte">{`<script>\n  let name = 'World';\n</script>\n\n<h1>Hello, {name}!</h1>`}</CodeBlock>

      {/* Next.js vs Vite */}
      <SectionHeading id="nextjs-vs-vite">Next.js vs Vite</SectionHeading>
      <Prose>
        <p>
          These aren't direct competitors — they solve different problems — but they're often compared.
        </p>
      </Prose>

      <SubHeading>Next.js</SubHeading>
      <Prose>
        <p>
          A <strong className="text-foreground">React meta-framework</strong> by Vercel. Adds SSR, SSG, API routes,
          file-based routing, and image optimization. Best for production apps that need SEO, server rendering,
          or edge deployment.
        </p>
      </Prose>

      <SubHeading>Vite</SubHeading>
      <Prose>
        <p>
          A <strong className="text-foreground">build tool</strong>, not a framework. Provides lightning-fast HMR
          via native ES modules and works with React, Vue, Svelte, and more. Best for SPAs, demos, and projects
          that don't need SSR.
        </p>
      </Prose>

      <DocCallout variant="success">
        This project uses <strong>Vite</strong> because it's a client-side demo — no SSR needed, instant dev feedback.
      </DocCallout>

      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="text-left px-4 py-2 font-medium text-foreground">Feature</th>
              <th className="text-left px-4 py-2 font-medium text-foreground">Next.js</th>
              <th className="text-left px-4 py-2 font-medium text-foreground">Vite</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr><td className="px-4 py-2 text-muted-foreground">SSR / SSG</td><td className="px-4 py-2 text-foreground">✓ Built-in</td><td className="px-4 py-2 text-muted-foreground">✗ SPA only</td></tr>
            <tr><td className="px-4 py-2 text-muted-foreground">API Routes</td><td className="px-4 py-2 text-foreground">✓ Built-in</td><td className="px-4 py-2 text-muted-foreground">✗ Separate</td></tr>
            <tr><td className="px-4 py-2 text-muted-foreground">Dev Speed</td><td className="px-4 py-2 text-muted-foreground">Fast</td><td className="px-4 py-2 text-foreground">Fastest</td></tr>
            <tr><td className="px-4 py-2 text-muted-foreground">Framework Lock</td><td className="px-4 py-2 text-muted-foreground">React only</td><td className="px-4 py-2 text-foreground">Any</td></tr>
          </tbody>
        </table>
      </div>

      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground font-mono">
          This page is informational. Demo pages with live API calls are coming next.
        </p>
      </div>
    </div>
  );
};

export default FrameworksOverview;
