// packages/portal/src/pages/_document.tsx
// Next.js custom document for MUI SSR

import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import type { AppProps } from 'next/app';
import type { ComponentType, ReactElement } from 'react';
import createEmotionServer from '@emotion/server/create-instance';
import { EmotionCache } from '@emotion/react';
import createEmotionCache from '@/utils/createEmotionCache';
import { theme } from '@/theme';

interface MyDocumentProps {
  emotionStyleTags: ReactElement[];
}

export default class MyDocument extends Document<MyDocumentProps> {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />

          {/* Favicon - covers legacy browsers, modern browsers, iOS home screen, and Android/Chrome */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" type="image/svg+xml" href="/icon.svg" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#002E5B" />
          <link rel="manifest" href="/site.webmanifest" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />
          {/* Inject MUI emotion styles for SSR */}
          {this.props.emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: ComponentType<AppProps & { emotionCache?: EmotionCache }>) =>
        function EnhanceApp(props: AppProps) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
