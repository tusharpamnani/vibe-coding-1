import { Lightbulb, Award, Users, BookOpen } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About ScholarSearch</h1>
        <p className="text-lg text-muted-foreground mb-10">
          ScholarSearch leverages cutting-edge AI technology to transform how researchers, 
          students, and academics find and interact with scholarly content.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
          <p className="text-muted-foreground mb-6">
            Our mission is to democratize access to academic knowledge by making it easier to find, 
            understand, and utilize scholarly research. We believe that AI can augment human 
            capabilities in research, enabling deeper insights and faster discoveries.
          </p>
          <p className="text-muted-foreground">
            By combining advanced search algorithms with natural language processing, we're 
            creating tools that understand the nuance and context of academic queries, delivering 
            more relevant results than traditional keyword searches.
          </p>
        </div>
        
        <div className="bg-muted rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Why Choose ScholarSearch?</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <Award className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <span>Access to high-quality, peer-reviewed research from reputable sources</span>
            </li>
            <li className="flex items-start">
              <Lightbulb className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <span>AI-powered search that understands context and academic terminology</span>
            </li>
            <li className="flex items-start">
              <Users className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <span>Built by researchers, for researchers - we understand your needs</span>
            </li>
            <li className="flex items-start">
              <BookOpen className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <span>Continuously expanding database of scholarly articles and resources</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="py-12 border-t">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Dr. Emily Chen', role: 'Founder & CEO', bio: 'Former professor with expertise in machine learning and information retrieval.' },
            { name: 'Mark Rodriguez', role: 'CTO', bio: 'AI researcher with 15 years of experience in natural language processing.' },
            { name: 'Dr. Sarah Johnson', role: 'Chief Research Officer', bio: 'Academic librarian turned tech innovator, passionate about knowledge accessibility.' }
          ].map((person, idx) => (
            <div key={idx} className="text-center">
              <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="font-bold text-lg">{person.name}</h3>
              <p className="text-primary text-sm mb-2">{person.role}</p>
              <p className="text-muted-foreground text-sm">{person.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}