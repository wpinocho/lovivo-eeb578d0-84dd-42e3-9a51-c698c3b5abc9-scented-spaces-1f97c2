import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { CollectionCard } from '@/components/CollectionCard';
import { FloatingCart } from '@/components/FloatingCart';
import { NewsletterSection } from '@/components/NewsletterSection';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import { ScentGuide } from '@/components/ScentGuide';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';
import heroFragrance from '@/assets/hero-fragrance.jpg';
import { useState } from 'react';

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

const scentFamilies = [
  { name: 'All', tag: null, color: 'bg-accent' },
  { name: 'Floral', tag: 'floral', color: 'bg-[hsl(var(--floral))]' },
  { name: 'Woody', tag: 'woody', color: 'bg-[hsl(var(--woody))]' },
  { name: 'Fresh', tag: 'fresh', color: 'bg-[hsl(var(--fresh))]' },
  { name: 'Citrus', tag: 'citrus', color: 'bg-[hsl(var(--citrus))]' },
];

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    selectedCollectionId,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic;

  const [selectedScent, setSelectedScent] = useState<string | null>(null);

  const filteredByScent = selectedScent 
    ? filteredProducts.filter(p => p.tags?.includes(selectedScent))
    : filteredProducts;

  return (
    <EcommerceTemplate showCart={true}>
      {/* Hero Section */}
      <section 
        className="relative bg-[hsl(var(--dark-bg))] text-background py-32 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(11, 11, 15, 0.7), rgba(11, 11, 15, 0.7)), url(${heroFragrance})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Discover Your
            <span className="block text-primary mt-2">Signature Scent</span>
          </h1>
          <p className="text-xl text-background/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Sensorial home fragrances crafted with artisanal care. Transform your spaces with our luxury candles and diffusers.
          </p>
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-full"
            onClick={() => {
              document.getElementById('scent-families')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }}
          >
            Find Your Note
          </Button>
        </div>
      </section>

      {/* Scent Family Chips */}
      <section id="scent-families" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Explore by Scent Family
            </h2>
            <p className="text-muted-foreground text-lg">
              Each fragrance tells a unique story
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {scentFamilies.map((family) => (
              <button
                key={family.name}
                onClick={() => setSelectedScent(family.tag)}
                className={`
                  px-6 py-3 rounded-full font-medium transition-all duration-200
                  ${selectedScent === family.tag 
                    ? `${family.color} text-background shadow-lg scale-105` 
                    : 'bg-card border-2 border-border text-foreground hover:border-primary'
                  }
                `}
              >
                {family.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      {!loadingCollections && collections.length > 0 && (
        <section id="collections" className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                Gift Sets
              </h2>
              <p className="text-muted-foreground text-lg">
                Thoughtfully curated for every occasion
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {collections.map((collection) => (
                <CollectionCard 
                  key={collection.id} 
                  collection={collection} 
                  onViewProducts={handleViewCollectionProducts} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section id="products" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                {selectedCollectionId 
                  ? `${collections.find(c => c.id === selectedCollectionId)?.name || 'Collection'}` 
                  : selectedScent
                    ? `${scentFamilies.find(f => f.tag === selectedScent)?.name} Fragrances`
                    : 'Our Collection'
                }
              </h2>
            </div>
            {(selectedCollectionId || selectedScent) && (
              <Button 
                variant="outline" 
                onClick={() => {
                  handleShowAllProducts();
                  setSelectedScent(null);
                }}
              >
                See All
              </Button>
            )}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-muted rounded-lg h-96 animate-pulse"></div>
              ))}
            </div>
          ) : filteredByScent.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredByScent.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No products available in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Scent Your Spaces Guide */}
      <ScentGuide />

      {/* Newsletter Section */}
      <NewsletterSection />

      <FloatingCart />
    </EcommerceTemplate>
  );
};