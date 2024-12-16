
// template is rendered between a layout and its children. 
export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <p className="hover:bg-gray-200">
                Templates are similar to layouts in that they wrap a child layout or page. Unlike layouts that persist across routes and maintain state, templates create a new instance for each of their children on navigation. This means that when a user navigates between routes that share a template, a new instance of the child is mounted, DOM elements are recreated, state is not preserved in Client Components, and effects are re-synchronized.
            
                There may be cases where you need those specific behaviors, and templates would be a more suitable option than layouts. For example:

                    1.To resynchronize useEffect on navigation.
                    2.To reset the state of a child Client Components on navigation.
            </p>
            {children}
        </div>
    )
}