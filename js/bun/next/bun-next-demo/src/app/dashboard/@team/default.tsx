
/* when router to /danshboard/setting, children will be set to the outer default page, 
since @team has no setting dir, @team would be set to the inner default page too. */
export default function Default() {
  return (
    <div className="flex items-center justify-center h-40 bg-green-500 text-white">
      <h1>This is the default page</h1>
    </div>
  )
}