import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination"

type Props = {
    page: number,
    pages: number,
    onChangePage : (page:number) => void
}

const PaginationSelector = ({page, pages, onChangePage}:Props) => {

  const number = [];

  for(let i = 1; i<=pages; i++){
    number.push(i)
  }
  return (
    <Pagination>
      <PaginationContent>
        {
          page!==1 && (
            <PaginationItem>
              <PaginationPrevious href="#" onClick={()=> onChangePage(page - 1) } />
            </PaginationItem>
          )
        }
        {
          number.map((items)=>(
            <PaginationItem>
              <PaginationLink href="#" onClick={()=> onChangePage(items)} isActive = {page === items}>
                {items}
              </PaginationLink>
            </PaginationItem>
          ))
        }
        {
          page!==number.length && (
            <PaginationItem>
              <PaginationNext href="#" onClick={() => onChangePage(page+1)} />
            </PaginationItem>
          )
        }
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationSelector
