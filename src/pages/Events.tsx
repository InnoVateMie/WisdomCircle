import { format, isPast, differenceInDays } from "date-fns";
import { Calendar, MapPin, ExternalLink, Clock, Sparkles } from "lucide-react";
import { useListEvents } from "@/lib/mock-api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Events() {
  const { data, isLoading } = useListEvents();

  const now = new Date();
  const upcoming = data?.items.filter((e: any) => !isPast(new Date(e.date))) ?? [];
  const past = data?.items.filter((e: any) => isPast(new Date(e.date))) ?? [];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative bg-primary overflow-hidden pt-12 sm:pt-16 pb-16 sm:pb-32">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary/10 blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-secondary/6 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(212,168,67,0.07)_0%,transparent_70%)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/70 text-xs font-medium mb-4 sm:mb-6">
              <Sparkles className="h-3 w-3 text-secondary" />
              Live sessions, workshops & studies
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-3 sm:mb-5 tracking-tight">
              Upcoming <span className="italic text-gold-gradient">Events</span>
            </h1>
            <p className="text-white/60 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Join our live sessions, Bible studies, and community gatherings designed to equip you with practical wisdom.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 pb-16 sm:pb-24">
        {isLoading ? (
          <div className="space-y-4 sm:space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-3xl border border-border/50 overflow-hidden flex flex-col md:flex-row">
                <Skeleton className="md:w-36 sm:md:w-44 h-32 sm:h-40 md:h-auto rounded-none" />
                <div className="flex-1 p-4 sm:p-8 space-y-3 sm:space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : !data?.items.length ? (
          <div className="text-center py-20 sm:py-28 bg-card rounded-3xl border border-dashed border-border/70">
            <Calendar className="mx-auto h-10 w-10 sm:h-14 sm:w-14 text-muted-foreground/25 mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-primary">No events scheduled</h3>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">Check back soon for upcoming programs.</p>
          </div>
        ) : (
          <div>
            {/* Upcoming */}
            {upcoming.length > 0 && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
                className="space-y-4 sm:space-y-6 mb-10 sm:mb-16"
              >
                <h2 className="text-xs sm:text-sm font-bold text-secondary uppercase tracking-widest mb-4 sm:mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-secondary animate-pulse" />
                  Upcoming Events
                </h2>
                {upcoming.map((event) => {
                  const eventDate = new Date(event.eventDate);
                  const daysUntil = differenceInDays(eventDate, now);
                  return (
                    <motion.div
                      key={event.id}
                      variants={itemVariants}
                      whileHover={{ y: -4 }}
                      className="group bg-card rounded-3xl border border-secondary/20 shadow-md hover:shadow-xl hover:border-secondary/40 transition-all duration-300 overflow-hidden flex flex-col md:flex-row"
                    >
                      {/* Date Block */}
                      <div className="md:w-36 sm:md:w-44 bg-primary flex flex-col items-center justify-center p-4 sm:p-6 text-center shrink-0 border-b md:border-b-0 md:border-r border-secondary/20">
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-secondary mb-0.5 sm:mb-1">
                          {format(eventDate, "MMM")}
                        </span>
                        <span className="text-4xl sm:text-6xl font-extrabold text-white leading-none my-0.5 sm:my-1">
                          {format(eventDate, "d")}
                        </span>
                        <span className="text-[10px] sm:text-xs text-white/50 font-medium">
                          {format(eventDate, "yyyy")}
                        </span>
                        {daysUntil <= 7 && daysUntil >= 0 && (
                          <Badge className="mt-2 sm:mt-3 bg-secondary/20 text-secondary border-0 text-[9px] sm:text-[10px] font-bold">
                            {daysUntil === 0 ? "Today!" : `In ${daysUntil}d`}
                          </Badge>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-7 md:p-9 flex-1 flex flex-col">
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-2xl font-bold text-primary mb-2 sm:mb-3 group-hover:text-secondary transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-foreground/70 leading-relaxed mb-3 sm:mb-5 text-xs sm:text-sm">
                            {event.description}
                          </p>
                          <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
                            <span className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground bg-muted/60 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium">
                              <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-secondary" />
                              {format(eventDate, "h:mm a")}
                            </span>
                            {event.location && (
                              <span className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground bg-muted/60 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium">
                                <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-secondary" />
                                {event.location}
                              </span>
                            )}
                          </div>
                        </div>

                        {event.link && (
                          <div className="mt-4 sm:mt-6 pt-3 sm:pt-5 border-t border-border/40">
                            <Button
                              asChild
                              className="rounded-full gold-gradient text-primary border-0 font-bold gap-2 hover:opacity-90 shadow-md text-sm sm:text-base"
                            >
                              <a href={event.link} target="_blank" rel="noopener noreferrer">
                                Register / Join <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                              </a>
                            </Button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* Past */}
            {past.length > 0 && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
              >
                <h2 className="text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4 sm:mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-muted-foreground/40" />
                  Past Events
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  {past.map((event) => {
                    const eventDate = new Date(event.eventDate);
                    return (
                      <motion.div
                        key={event.id}
                        variants={itemVariants}
                        className="bg-muted/40 rounded-2xl border border-border/40 p-4 sm:p-6 flex flex-col sm:flex-row gap-3 sm:gap-5 items-start sm:items-center opacity-65 hover:opacity-80 transition-opacity"
                      >
                        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-muted flex flex-col items-center justify-center text-center">
                            <span className="text-[8px] sm:text-[9px] font-bold text-muted-foreground uppercase">{format(eventDate, "MMM")}</span>
                            <span className="text-base sm:text-lg font-bold text-foreground leading-none">{format(eventDate, "d")}</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-foreground/80 mb-1">{event.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">{event.description}</p>
                        </div>
                        <Badge variant="outline" className="text-xs text-muted-foreground shrink-0">
                          Past Event
                        </Badge>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
