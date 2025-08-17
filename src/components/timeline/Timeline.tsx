
import Link from "next/link";
import Paragraph from "@/components/typography/Paragraphs";
import Heading from "@/components/typography/Headings";
import Card from "@/components/cards/Card";
import { experienceService } from "@/services";

// Helper function to format dates
const formatDateRange = (startDate: string, endDate: string): string => {
  const start = new Date(startDate);
  const end = endDate === 'Current' || endDate === 'Ongoing' ? null : new Date(endDate);
  
  const startFormatted = start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  if (!end) {
    return `${startFormatted} - ${endDate}`;
  }
  
  const endFormatted = end.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  return `${startFormatted} - ${endFormatted}`;
};

export async function TimelineFull() {
  const experiencesResult = await experienceService.getAllExperiences();
  
  if (!experiencesResult.success) {
    console.error('Failed to fetch experiences:', experiencesResult.error);
    return (
      <div className="text-center text-neutral-400">
        <Paragraph>Failed to load experience timeline.</Paragraph>
      </div>
    );
  }

  if (experiencesResult.data.length === 0) {
    return (
      <div className="text-center text-neutral-400">
        <Paragraph>No experience data available.</Paragraph>
      </div>
    );
  }

  return (
    <div className="space-y-8">
              {experiencesResult.data.map((experience) => (
        <Card 
          key={experience.id} 
          variant="default" 
          className="p-6 hover:bg-neutral-900/40 transition-all duration-300 group"
        >
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-4 h-4 bg-primary rounded-full border-2 border-primary/30 group-hover:border-primary/50 transition-colors duration-300" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <Heading Level={4} className="text-primary mb-1 group-hover:text-primary-light transition-colors duration-300">
                  {experience.title}
                </Heading>
                <div className="flex items-center gap-2 mb-2">
                  {experience.link ? (
                    <Link
                      href={experience.link}
                      target="_blank"
                      className="text-neutral-300 hover:text-primary transition-colors duration-300 font-medium"
                    >
                      {experience.employer}
                    </Link>
                  ) : (
                    <span className="text-neutral-300 font-medium">{experience.employer}</span>
                  )}
                  <span className="text-neutral-500">•</span>
                  <span className="text-neutral-400 text-sm">
                    {formatDateRange(experience.startDate, experience.endDate)}
                  </span>
                </div>
              </div>
              <Paragraph size="base" className="text-neutral-200 leading-relaxed">
                {experience.details}
              </Paragraph>
              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skillItem) => (
                  <span 
                    key={skillItem.skill.id} 
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm border border-primary/20 hover:bg-primary/20 hover:border-primary/30 transition-all duration-200"
                  >
                    {skillItem.skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// Smaller more condensed timeline for the home page, better sizing.
export async function TimelineHome() {
  const experiencesResult = await experienceService.getAllExperiences();
  
  if (!experiencesResult.success) {
    console.error('Failed to fetch experiences:', experiencesResult.error);
    return (
      <div className="text-center text-neutral-400">
        <Paragraph size="sm">Failed to load experience timeline.</Paragraph>
      </div>
    );
  }

  if (experiencesResult.data.length === 0) {
    return (
      <div className="text-center text-neutral-400">
        <Paragraph size="sm">No experience data available.</Paragraph>
      </div>
    );
  }

  const recentExperiences = experiencesResult.data.slice(0, 3);

  return (
    <div className="space-y-6">
      {recentExperiences.map((experience) => (
        <Card 
          key={experience.id} 
          variant="default" 
          className="p-4 hover:bg-neutral-900/40 transition-all duration-300 group"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-3 h-3 bg-primary rounded-full border-2 border-primary/30 group-hover:border-primary/50 transition-colors duration-300" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <Heading Level={5} className="text-primary mb-1 group-hover:text-primary-light transition-colors duration-300">
                  {experience.title}
                </Heading>
                <div className="flex items-center gap-2 mb-1">
                  {experience.link ? (
                    <Link
                      href={experience.link}
                      target="_blank"
                      className="text-neutral-300 hover:text-primary transition-colors duration-300 text-sm font-medium"
                    >
                      {experience.employer}
                    </Link>
                  ) : (
                    <span className="text-neutral-300 text-sm font-medium">{experience.employer}</span>
                  )}
                  <span className="text-neutral-500">•</span>
                  <span className="text-neutral-400 text-xs">
                    {formatDateRange(experience.startDate, experience.endDate)}
                  </span>
                </div>
              </div>
              <Paragraph size="sm" className="text-neutral-200 leading-relaxed">
                {experience.details.length > 120 
                  ? `${experience.details.substring(0, 120)}...` 
                  : experience.details
                }
              </Paragraph>
              <div className="flex flex-wrap gap-1">
                {experience.skills.slice(0, 4).map((skillItem) => (
                  <span
                    key={skillItem.skill.id}
                    className="bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded-full text-xs hover:bg-primary/20 hover:border-primary/30 transition-all duration-200"
                  >
                    {skillItem.skill.name}
                  </span>
                ))}
                {experience.skills.length > 4 && (
                  <span className="text-primary/60 text-xs px-2 py-1">
                    +{experience.skills.length - 4} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
