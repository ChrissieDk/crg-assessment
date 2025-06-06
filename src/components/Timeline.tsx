import type { TimelineItem } from '../types/Timeline';

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="timeline-container">
      {/* Timeline items will be rendered here - empty component for the time being */}
      <span className="text-gray-400">Timeline placeholder</span>
    </div>
  );
};

export default Timeline; 