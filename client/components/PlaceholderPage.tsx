import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-background flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
            <span className="text-4xl font-bold font-khand text-primary">→</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold font-khand mb-4 text-foreground">
          {title}
        </h1>

        {description && (
          <p className="text-lg text-muted-foreground mb-8">
            {description}
          </p>
        )}

        <p className="text-muted-foreground mb-8">
          This page is coming soon! Continue prompting to help us build out this section of the app.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors"
        >
          Back to Home
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
