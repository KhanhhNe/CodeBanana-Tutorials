import asyncio
import time

import aiohttp

url = 'https://reqbin.com/echo?secret={}'


async def request_sync():
    start = time.perf_counter()

    async with aiohttp.ClientSession() as client:
        for secret in range(50):
            await client.get(url.format(secret))

    duration = time.perf_counter() - start
    print(f"Total time: {duration} s")
    print(f"Time per request: {duration / 50} s")


async def request_10000_async():
    start = time.perf_counter()

    async with aiohttp.ClientSession() as client:
        tasks = []
        for secret in range(10000):
            # Tạo coroutines
            tasks.append(client.get(url.format(secret)))

        # Đợi tất cả coroutines thực thi xong
        await asyncio.gather(*tasks)

    duration = time.perf_counter() - start
    print(f"Total time: {duration} s")
    print(f"Time per request: {duration / 10000} s")


if __name__ == '__main__':
    asyncio.get_event_loop().run_until_complete(asyncio.gather(request_sync(), request_10000_async()))
