"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, CheckCircle2, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required").max(100),
  homeCity: z.string().max(100).optional(),
  homeCountry: z.string().max(100).optional(),
  travelInterest: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

const travelInterests = [
  "Adventure & Outdoor",
  "Beach & Relaxation",
  "Cultural & Historical",
  "Food & Culinary",
  "Wildlife & Nature",
  "Urban Exploration",
  "Luxury Travel",
  "Budget Backpacking",
  "Wellness & Spa",
  "Photography",
]

interface WaitlistFormProps {
  referredBy?: string
}

export function WaitlistForm({ referredBy }: WaitlistFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
    referralLink?: string
  }>({ type: null, message: "" })

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      homeCity: "",
      homeCountry: "",
      travelInterest: "",
    },
  })

  async function onSubmit(values: FormData) {
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          referredBy: referredBy || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setSubmitStatus({
          type: "error",
          message: data.error || "Something went wrong. Please try again.",
        })
      } else {
        setSubmitStatus({
          type: "success",
          message:
            "Welcome aboard! Check your email for a special message from us.",
          referralLink: data.referralLink,
        })
        form.reset()
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus.type === "success") {
    return (
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="text-center space-y-4 p-8 rounded-lg bg-green-50 border border-green-200">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto" />
          <h3 className="text-2xl font-bold text-green-900">
            You&apos;re on the list!
          </h3>
          <p className="text-green-800">{submitStatus.message}</p>
          {submitStatus.referralLink && (
            <div className="mt-6 p-4 bg-white rounded-md border border-green-300">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Share your referral link:
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={submitStatus.referralLink}
                  readOnly
                  className="flex-1 px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md"
                  onClick={(e) => e.currentTarget.select()}
                />
                <Button
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      submitStatus.referralLink || ""
                    )
                  }}
                >
                  Copy
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name *</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="homeCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Home City</FormLabel>
                <FormControl>
                  <Input placeholder="San Francisco" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="homeCountry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Home Country</FormLabel>
                <FormControl>
                  <Input placeholder="United States" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="travelInterest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Top Travel Interest</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your interest" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {travelInterests.map((interest) => (
                      <SelectItem key={interest} value={interest}>
                        {interest}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {submitStatus.type === "error" && (
            <div className="flex items-start gap-2 p-4 rounded-lg bg-red-50 border border-red-200">
              <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-800">{submitStatus.message}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Joining...
              </>
            ) : (
              "Join the Waitlist"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
