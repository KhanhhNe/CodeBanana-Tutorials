import threading
import time

import requests

url = 'https://reqbin.com/echo?secret={}'


def request_sync():
    start = time.perf_counter()

    for secret in range(50):
        requests.get(url.format(secret))

    duration = time.perf_counter() - start
    print(f"Total time: {duration} s")
    print(f"Time per request: {duration / 50} s")


def request_10000_async():
    start = time.perf_counter()
    client = requests.Session()

    def request(secret_number):
        client.get(url.format(secret_number))

    tasks = []
    for secret in range(10000):
        # Tạo thread và khởi động chúng
        task = threading.Thread(target=request, args=(secret,))
        task.start()
        tasks.append(task)

    # Đợi tất cả thread thực thi xong
    for task in tasks:
        task.join()

    duration = time.perf_counter() - start
    print(f"Total time: {duration} s")
    print(f"Time per request: {duration / 10000} s")


if __name__ == '__main__':
    request_sync()
    request_10000_async()
