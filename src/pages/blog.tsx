import Link from 'next/link';
import * as React from 'react';

import Badge from '@/components/Badge';
import BlogCard from '@/components/BlogCard';
import Head from '@/components/Head';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { fetchBlogPosts } from '@/services/blog.services';

import { BlogData } from '@/types/blog.types';

interface BlogPageProps {
  blogs: BlogData[];
}

export default function BlogPage({ blogs }: BlogPageProps) {
  return (
    <Layout>
      <Seo templateTitle='Blog' />

      <main>
        <section className='backdrop-blur-sm md:backdrop-blur-none'>
          <div className='layout min-h-screen py-28'>
            <Head slogan='CHËCK EM ÖUT'>Blog</Head>
            {blogs ? (
              <div className='mt-20 flex flex-col md:grid md:grid-cols-2 md:gap-10'>
                {blogs.map((item: BlogData, key: number) => (
                  <Link
                    href={`/blog-post/${item.attributes.slug}`}
                    className='slidingLink border-0 border-b-[1px] border-dashed border-b-[#333333] bg-gradient-to-r from-white to-white py-8 md:border-b-0 md:py-6'
                    key={`blog-${key}`}
                  >
                    <div className='w-full'>
                      <BlogCard>
                        <div className='flex flex-row items-center justify-between'>
                          <BlogCard.Date>
                            Tuesday, October 25th 2022
                          </BlogCard.Date>
                          <Badge variant={item.attributes.status.value}>
                            {item.attributes.status.title}
                          </Badge>
                        </div>
                        <BlogCard.Title>{item.attributes.title}</BlogCard.Title>
                        <BlogCard.Body>
                          {item.attributes.description}
                        </BlogCard.Body>
                      </BlogCard>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const blogs = await fetchBlogPosts();

  return {
    props: {
      blogs: blogs.data,
    },
  };
}
