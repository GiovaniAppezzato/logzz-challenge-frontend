import { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import Link from "next/link";
import ReactPaginate from 'react-paginate';
import { FaImage, FaPlus, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import PrivateLayout from "@/components/layouts/PrivateLayout";
import { Card, Spinner, Input, Alert, Avatar } from "@/components";
import { IProduct } from "@/interfaces/product";
import ProductService from "@/services/api/product";
import ToastService from "@/services/toast";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [productToDelete, setProductToDelete] = useState<number|string|null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });

  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(term);

  const { t } = useTranslation();
  const titlePage = t("pages.home.title");

  useEffect(() => {
    getProducts().finally(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    if(!isLoading) {
      getProducts();
    }
  }, [debouncedTerm]);

  async function getProducts(page: number = 1) {
    try {
      const response = await ProductService.getProducts({ page, term });
      const meta = response.data.meta;

      // Update products list
      setProducts(response.data.data);

      // Update data pagination
      setPagination({
        ...pagination,
        current_page: meta.current_page,
        last_page: meta.last_page,
        total: meta.total
      });
    } catch (error) {
      ToastService.error(t("errors.default.message"));
    } finally {
      setIsLoading(false);
    }
  }

  function handlePageChange(selectedItem: { selected: number }) {
    const newPage = selectedItem.selected + 1;
    getProducts(newPage);
  }

  async function handleDelete(id: number|string) {
    if(!productToDelete) {
      setProductToDelete(id);
      try {
        await ProductService.delete(id);

        ToastService.success(t("pages.home.productDeleted"));

        setProducts(products.filter((product) => product.id !== id));
      } catch (error) {
        ToastService.error(t("errors.default.message"));
      } finally {
        setProductToDelete(null);
      }
    } 
  }

  return (
    <PrivateLayout title={titlePage}>
      <Card>
        <Card.Header>
          <div>
            <h3 className="font-medium mb-1">{t("pages.home.cardTitle")}</h3>
            <span className="text-xs">{t("pages.home.cardDescription")}</span>
          </div>
          <Link href="/products/create" className="button button-primary button-sm">
            <FaPlus />
            {t("pages.home.cardButton")}
          </Link>
        </Card.Header>
        <Card.Body>
          {!isLoading ? (
            <>
              <div className="flex justify-between items-center mb-4">
              <div>
                {t("pages.home.total", {
                  count: pagination.total
                })}
              </div>

              <Input
                id="term"
                name="term"
                className="max-w-72"
                placeholder={t("pages.home.searchPlaceholder")}
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
            </div>

            <DataTable
              data={products}
              paginationComponentOptions={{ rowsPerPageText: t("pages.home.rowsPerPageText") }}
              noDataComponent={(<div className="py-6">{t("pages.home.noDataComponent")}</div>)}
              columns={[
                {
                  name: t("fields.product"),
                  minWidth: "300px",
                  selector: (row: IProduct) => row.name,
                  cell: (row: IProduct) => (
                    <div className="inline-flex align-items-center gap-3">
                      <Avatar 
                        src={row.image_url || undefined} 
                        icon={<FaImage className="w-3 h-3 m-auto text-gray-600" />} 
                        className="!w-8 !h-8 !text-xl" 
                      />
                      <div className="inline-flex items-center">
                        <span className="truncate max-w-56">{row.name}</span>
                      </div>
                    </div>
                  )
                },
                {
                  name: t("fields.price"),
                  selector: (row: IProduct) => `$${ row.price}`
                },
                {
                  name: t("fields.category"),
                  selector: (row: IProduct) => row.category
                },
                {
                  name: t("pages.home.actions"),
                  cell: (row: IProduct) => (
                    <div className="flex align-items-center gap-2">
                      <Link href={`/products/${row.id}/edit`} className="button-icon button-icon button-primary rounded-full">
                        <MdEdit className="!text-white" />
                      </Link>
                      <button className="button-icon button-icon button-danger rounded-full" onClick={() => handleDelete(row.id)}>
                        {
                          productToDelete && productToDelete === row.id
                            ? <Spinner />
                            : <FaTrash className="!text-white" /> 
                        }
                      </button>
                    </div>
                  )
                }
              ]}
            />

            {(products.length > 0 && pagination.total != 0) && (
              <ReactPaginate
                previousLabel={t("pages.home.previousLabel")}
                nextLabel={t("pages.home.nextLabel")}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pagination.last_page}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={"py-6 flex justify-center gap-3 text-sm"}
                pageClassName={"page-link"}
                activeClassName={"page-active"}
                nextClassName="inline-flex items-center"
                previousClassName="inline-flex items-center"
              />
            )}
            </>
          ) : (
            <Alert className='w-full flex justify-center'>
              <Spinner className='h-5 w-5' />
            </Alert>
          )}
        </Card.Body>
      </Card>
    </PrivateLayout>
  )
}
