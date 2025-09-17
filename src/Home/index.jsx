import { useMemo, useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import "./home.css";

const BASE = import.meta.env.BASE_URL; // 배포 경로 대응

export default function Home({ items = [] }) {
  const [sort, setSort] = useState({ key: null, dir: "asc" });
  const [selected, setSelected] = useState(null);

  const sorted = useMemo(() => {
    if (!sort.key) return items;
    const copy = [...items];
    copy.sort((a, b) => {
      let A = a[sort.key], B = b[sort.key];
      if (typeof A === "string") { A = A.toLowerCase(); B = B.toLowerCase(); }
      if (A < B) return sort.dir === "asc" ? -1 : 1;
      if (A > B) return sort.dir === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [items, sort]);

  const toggleSort = (key) =>
    setSort(p => ({ key, dir: p.key === key && p.dir === "asc" ? "desc" : "asc" }));
  const reset = () => setSort({ key: null, dir: "asc" });

  return (
    <>
      {/* 상단 정렬 바 */}
      <div className="sortbar">
        <Button size="sm" variant="light" onClick={reset}>처음처럼</Button>
        <Button size="sm" variant="light" onClick={() => toggleSort("price")}>
          가격 {sort.key === "price" ? (sort.dir === "asc" ? "▲" : "▼") : "▼▲"}
        </Button>
        <Button size="sm" variant="light" onClick={() => toggleSort("title")}>
          물건명 {sort.key === "title" ? (sort.dir === "asc" ? "▲" : "▼") : "▼▲"}
        </Button>
      </div>

      {/* 리스트 (1열 크게) */}
      <Container className="py-3">
        <Row xs={1} md={1} className="g-5">
          {sorted.map((item) => {
            const imgSrc = `${BASE}room${item.id}.jpg`; // ← 여기!
            return (
              <Col key={item.id}>
                <div className="text-center mb-2">
                  <h5 className="mb-1">{item.title}</h5>
                  <div className="text-muted small">
                    {item.price.toLocaleString()}원 ·{" "}
                    <a href="#" onClick={(e)=>{e.preventDefault(); alert("허위매물 신고 접수!");}}>
                      허위매물신고
                    </a>
                  </div>
                </div>

                <Card className="shadow-sm" role="button" onClick={() => setSelected(item)}>
                  <Card.Img
                    src={imgSrc}
                    alt={item.title}
                    onError={(e) => { e.currentTarget.src = `${BASE}room0.jpg`; }}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      {/* 상세 모달 */}
      <Modal centered show={!!selected} onHide={() => setSelected(null)}>
        {selected && (
          <Modal.Body className="text-center">
            <h5 className="mb-2">{selected.title}</h5>
            <div className="text-muted">{selected.content}</div>
            <div className="my-2">가격: {selected.price.toLocaleString()}원</div>
            <Button variant="outline-dark" size="sm" onClick={() => setSelected(null)}>닫기</Button>
            <img
              className="mt-3 img-fluid rounded"
              src={`${BASE}room${selected.id}.jpg`}   // ← 여기!
              alt={selected.title}
              onError={(e) => { e.currentTarget.src = `${BASE}room0.jpg`; }}
            />
          </Modal.Body>
        )}
      </Modal>
    </>
  );
}
