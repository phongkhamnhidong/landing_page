import FadeInView from "./FadeInView"

type Props = {
  label?: string
  title: string
  center?: boolean
}

export default function SectionHeader({ label, title, center = true }: Props) {
  return (
    <FadeInView className={`mb-10 ${center ? "text-center" : ""}`}>
      {label && (
        <p className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">{label}</p>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-navy">{title}</h2>
      <div className={`flex items-center gap-3 mt-4 ${center ? "justify-center" : ""}`}>
        <div className="h-px w-10 bg-gold" />
        <div className="h-1.5 w-1.5 rounded-full bg-gold" />
        <div className="h-px w-10 bg-gold" />
      </div>
    </FadeInView>
  )
}
