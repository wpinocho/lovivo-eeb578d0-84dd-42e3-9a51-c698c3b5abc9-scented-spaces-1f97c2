import { Card, CardContent } from '@/components/ui/card';
import { Home, BedDouble, Bath, Users } from 'lucide-react';

const spaces = [
  {
    icon: Home,
    title: 'Living Room',
    scents: ['Woody', 'Fresh'],
    description: 'Create a welcoming atmosphere with grounding woody notes or refreshing botanicals.',
  },
  {
    icon: BedDouble,
    title: 'Bedroom',
    scents: ['Floral', 'Woody'],
    description: 'Promote relaxation with soft florals or calming cedarwood for restful nights.',
  },
  {
    icon: Bath,
    title: 'Bathroom',
    scents: ['Fresh', 'Citrus'],
    description: 'Energize with crisp eucalyptus or bright citrus notes for a spa-like experience.',
  },
  {
    icon: Users,
    title: 'Entryway',
    scents: ['Citrus', 'Floral'],
    description: 'Make lasting impressions with uplifting citrus or elegant floral welcomes.',
  },
];

export const ScentGuide = () => {
  return (
    <section className="py-20 bg-[hsl(var(--dark-bg))] text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">
            Scent Your Spaces
          </h2>
          <p className="text-background/70 text-lg max-w-2xl mx-auto">
            Discover how to curate the perfect atmosphere for every room in your home
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {spaces.map((space) => (
            <Card key={space.title} className="bg-[hsl(var(--dark-secondary))] border-background/10 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                  <space.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-background mb-3">
                  {space.title}
                </h3>
                <div className="flex justify-center gap-2 mb-3">
                  {space.scents.map((scent) => (
                    <span 
                      key={scent} 
                      className="text-xs px-3 py-1 rounded-full bg-primary/30 text-primary font-medium"
                    >
                      {scent}
                    </span>
                  ))}
                </div>
                <p className="text-background/60 text-sm leading-relaxed">
                  {space.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};